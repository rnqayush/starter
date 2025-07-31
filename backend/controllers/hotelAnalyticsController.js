const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// @desc    Get hotel dashboard analytics
// @route   GET /api/hotels/:id/analytics
// @access  Private (Hotel Owner)
const getHotelAnalytics = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { period = '30' } = req.query; // days

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return errorResponse(res, 'Hotel not found', 404);
    }

    const periodDays = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    // Get bookings for the period
    const bookings = await Booking.find({
      'hotelBooking.hotel': id,
      createdAt: { $gte: startDate }
    });

    // Calculate analytics
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;

    // Calculate occupancy rate
    const totalRooms = hotel.rooms.reduce((sum, room) => sum + room.availability.totalRooms, 0);
    const totalNights = bookings.reduce((sum, booking) => {
      if (booking.hotelBooking && booking.hotelBooking.totalNights) {
        return sum + booking.hotelBooking.totalNights;
      }
      return sum;
    }, 0);
    const occupancyRate = totalRooms > 0 ? ((totalNights / (totalRooms * periodDays)) * 100).toFixed(2) : 0;

    // Average daily rate
    const averageDailyRate = totalNights > 0 ? (totalRevenue / totalNights).toFixed(2) : 0;

    // Revenue per available room
    const revPAR = totalRooms > 0 ? (totalRevenue / (totalRooms * periodDays)).toFixed(2) : 0;

    // Booking trends (daily breakdown)
    const bookingTrends = [];
    for (let i = periodDays - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));

      const dayBookings = bookings.filter(b => 
        b.createdAt >= dayStart && b.createdAt <= dayEnd
      );

      bookingTrends.push({
        date: dayStart.toISOString().split('T')[0],
        bookings: dayBookings.length,
        revenue: dayBookings.reduce((sum, b) => sum + b.totalAmount, 0)
      });
    }

    // Room type performance
    const roomPerformance = hotel.rooms.map(room => {
      const roomBookings = bookings.filter(b => 
        b.hotelBooking && b.hotelBooking.room && 
        b.hotelBooking.room.toString() === room._id.toString()
      );

      return {
        roomType: room.type,
        roomName: room.name,
        bookings: roomBookings.length,
        revenue: roomBookings.reduce((sum, b) => sum + b.totalAmount, 0),
        occupancyRate: room.availability.totalRooms > 0 ? 
          ((roomBookings.reduce((sum, b) => sum + (b.hotelBooking?.totalNights || 0), 0) / 
            (room.availability.totalRooms * periodDays)) * 100).toFixed(2) : 0
      };
    });

    // Guest demographics (simplified)
    const guestDemographics = {
      adults: bookings.reduce((sum, b) => sum + (b.hotelBooking?.guests?.adults || 0), 0),
      children: bookings.reduce((sum, b) => sum + (b.hotelBooking?.guests?.children || 0), 0)
    };

    // Payment status breakdown
    const paymentBreakdown = {
      paid: bookings.filter(b => b.paymentStatus === 'paid').length,
      pending: bookings.filter(b => b.paymentStatus === 'pending').length,
      failed: bookings.filter(b => b.paymentStatus === 'failed').length
    };

    return successResponse(res, {
      period: `${periodDays} days`,
      overview: {
        totalBookings,
        totalRevenue,
        confirmedBookings,
        pendingBookings,
        cancelledBookings,
        occupancyRate: parseFloat(occupancyRate),
        averageDailyRate: parseFloat(averageDailyRate),
        revPAR: parseFloat(revPAR)
      },
      trends: bookingTrends,
      roomPerformance,
      guestDemographics,
      paymentBreakdown,
      hotel: {
        id: hotel._id,
        name: hotel.name,
        totalRooms
      }
    }, 'Hotel analytics retrieved successfully');

  } catch (error) {
    console.error('Hotel analytics error:', error);
    return errorResponse(res, 'Error retrieving hotel analytics', 500);
  }
});

// @desc    Get booking calendar data
// @route   GET /api/hotels/:id/calendar
// @access  Private (Hotel Owner)
const getBookingCalendar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { month, year } = req.query;

  const currentDate = new Date();
  const targetMonth = month ? parseInt(month) - 1 : currentDate.getMonth();
  const targetYear = year ? parseInt(year) : currentDate.getFullYear();

  const startDate = new Date(targetYear, targetMonth, 1);
  const endDate = new Date(targetYear, targetMonth + 1, 0);

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return errorResponse(res, 'Hotel not found', 404);
    }

    // Get all bookings for the month
    const bookings = await Booking.find({
      'hotelBooking.hotel': id,
      $or: [
        {
          'hotelBooking.checkIn': {
            $gte: startDate,
            $lte: endDate
          }
        },
        {
          'hotelBooking.checkOut': {
            $gte: startDate,
            $lte: endDate
          }
        },
        {
          'hotelBooking.checkIn': { $lte: startDate },
          'hotelBooking.checkOut': { $gte: endDate }
        }
      ]
    }).populate('hotelBooking.room');

    // Create calendar data
    const calendarData = [];
    const daysInMonth = endDate.getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(targetYear, targetMonth, day);
      
      const dayBookings = bookings.filter(booking => {
        const checkIn = new Date(booking.hotelBooking.checkIn);
        const checkOut = new Date(booking.hotelBooking.checkOut);
        return currentDay >= checkIn && currentDay < checkOut;
      });

      calendarData.push({
        date: currentDay.toISOString().split('T')[0],
        bookings: dayBookings.length,
        revenue: dayBookings.reduce((sum, b) => sum + (b.totalAmount / b.hotelBooking.totalNights), 0),
        occupiedRooms: dayBookings.length,
        bookingDetails: dayBookings.map(b => ({
          id: b._id,
          customerName: b.customer.name,
          roomType: b.hotelBooking.room?.type || 'Unknown',
          status: b.status,
          checkIn: b.hotelBooking.checkIn,
          checkOut: b.hotelBooking.checkOut
        }))
      });
    }

    return successResponse(res, {
      month: targetMonth + 1,
      year: targetYear,
      calendar: calendarData,
      summary: {
        totalBookings: bookings.length,
        totalRevenue: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
        averageOccupancy: (calendarData.reduce((sum, day) => sum + day.occupiedRooms, 0) / daysInMonth).toFixed(2)
      }
    }, 'Booking calendar retrieved successfully');

  } catch (error) {
    console.error('Booking calendar error:', error);
    return errorResponse(res, 'Error retrieving booking calendar', 500);
  }
});

// @desc    Get revenue analytics
// @route   GET /api/hotels/:id/revenue
// @access  Private (Hotel Owner)
const getRevenueAnalytics = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { period = 'month' } = req.query; // month, quarter, year

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return errorResponse(res, 'Hotel not found', 404);
    }

    let startDate, endDate, groupBy;
    const currentDate = new Date();

    switch (period) {
      case 'month':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        groupBy = { $dayOfMonth: '$createdAt' };
        break;
      case 'quarter':
        const quarter = Math.floor(currentDate.getMonth() / 3);
        startDate = new Date(currentDate.getFullYear(), quarter * 3, 1);
        endDate = new Date(currentDate.getFullYear(), (quarter + 1) * 3, 0);
        groupBy = { $month: '$createdAt' };
        break;
      case 'year':
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        endDate = new Date(currentDate.getFullYear(), 11, 31);
        groupBy = { $month: '$createdAt' };
        break;
      default:
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        groupBy = { $dayOfMonth: '$createdAt' };
    }

    // Aggregate revenue data
    const revenueData = await Booking.aggregate([
      {
        $match: {
          'hotelBooking.hotel': hotel._id,
          createdAt: { $gte: startDate, $lte: endDate },
          status: 'confirmed'
        }
      },
      {
        $group: {
          _id: groupBy,
          totalRevenue: { $sum: '$totalAmount' },
          bookingCount: { $sum: 1 },
          averageBookingValue: { $avg: '$totalAmount' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Calculate growth rate
    const totalRevenue = revenueData.reduce((sum, item) => sum + item.totalRevenue, 0);
    const totalBookings = revenueData.reduce((sum, item) => sum + item.bookingCount, 0);

    return successResponse(res, {
      period,
      startDate,
      endDate,
      summary: {
        totalRevenue,
        totalBookings,
        averageBookingValue: totalBookings > 0 ? (totalRevenue / totalBookings).toFixed(2) : 0
      },
      data: revenueData
    }, 'Revenue analytics retrieved successfully');

  } catch (error) {
    console.error('Revenue analytics error:', error);
    return errorResponse(res, 'Error retrieving revenue analytics', 500);
  }
});

module.exports = {
  getHotelAnalytics,
  getBookingCalendar,
  getRevenueAnalytics
};

