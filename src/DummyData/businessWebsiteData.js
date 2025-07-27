// Centralized business website data for UI texts and content
// This data simulates what would come from an API call

export const businessWebsiteData = {
  salon: {
    id: 'salon',
    name: 'Beauty Salon',
    slug: 'salon',
    primaryColor: '#e91e63',
    hero: {
      title: 'Luxury Beauty Salon & Spa',
      subtitle:
        'Transform your look with our expert stylists and premium beauty treatments in a relaxing atmosphere.',
      backgroundImage:
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&w=1200&q=80',
    },
    about: {
      title: 'About Our Salon',
      description:
        'With over 15 years of experience, our luxury salon combines traditional techniques with modern innovation to deliver exceptional beauty services.',
      extendedDescription:
        'We pride ourselves on delivering exceptional service and creating memorable experiences for all our clients. Our commitment to excellence has made us a trusted choice in the community.',
      stats: [
        { number: '850+', label: 'Services Completed' },
        { number: '12+', label: 'Years Experience' },
        { number: '4.9', label: '★ Average Rating' },
        { number: '500+', label: 'Happy Clients' },
      ],
    },
    sections: {
      services: {
        title: 'Our Services',
        subtitle:
          'We offer a comprehensive range of professional services designed to meet your needs and exceed your expectations.',
      },
      team: {
        title: 'Meet Our Team',
        subtitle:
          'Our experienced professionals are passionate about delivering exceptional results and making you feel your absolute best.',
      },
      testimonials: {
        title: 'What Our Clients Say',
        subtitle:
          "Don't just take our word for it - hear from our satisfied customers about their experiences.",
        sampleTestimonial: {
          text: "Outstanding service and professional staff. I couldn't be happier with the results!",
          author: 'Client Name',
          role: 'Satisfied Customer',
        },
      },
      gallery: {
        title: 'Our Gallery',
        subtitle:
          'Take a look at our work, facilities, and the beautiful transformations we create for our clients.',
      },
      packages: {
        title: 'Our Packages',
        subtitle:
          'Choose from our specially curated packages designed to give you the complete experience you deserve.',
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle:
          'Find answers to common questions about our services, policies, and booking process.',
      },
      reviews: {
        title: 'Client Reviews',
        subtitle:
          'Read what our valued clients have to say about their experiences with us.',
      },
      portfolio: {
        title: 'My Portfolio',
        subtitle:
          'Explore my latest projects and creative work across various industries and platforms.',
      },
      skills: {
        title: 'My Skills',
        subtitle:
          'Technical expertise and creative abilities that I bring to every project.',
      },
      experience: {
        title: 'Experience',
        subtitle:
          'Professional journey and key roles that have shaped my expertise.',
      },
    },
    ui: {
      buttons: {
        bookNow: 'Book Now',
        bookAppointment: 'Book Appointment',
        learnMore: 'Learn More',
        sendMessage: 'Send Message',
        getStarted: 'Get Started',
        viewPortfolio: 'View Portfolio',
        contactUs: 'Contact Us',
      },
      contactForm: {
        placeholders: {
          name: 'Your Name',
          email: 'Your Email',
          phone: 'Your Phone',
          message: 'Your Message',
        },
      },
      businessHours: {
        title: 'Business Hours',
        contactInfoTitle: 'Contact Information',
      },
    },
    services: [
      {
        id: 1,
        icon: '✂️',
        title: 'Hair Styling',
        description:
          'Professional cuts, colors, and treatments for all hair types',
        price: 'From $45',
      },
      {
        id: 2,
        icon: '💅',
        title: 'Nail Care',
        description:
          'Manicures, pedicures, and nail art by certified technicians',
        price: 'From $25',
      },
      {
        id: 3,
        icon: '🧴',
        title: 'Spa Treatments',
        description: 'Relaxing facials, massages, and body treatments',
        price: 'From $65',
      },
      {
        id: 4,
        icon: '💄',
        title: 'Makeup Services',
        description: 'Professional makeup for special occasions and events',
        price: 'From $50',
      },
      {
        id: 5,
        icon: '🎨',
        title: 'Hair Coloring',
        description: 'Expert color services including highlights and balayage',
        price: 'From $80',
      },
      {
        id: 6,
        icon: '��',
        title: 'Organic Treatments',
        description: 'Natural and organic beauty treatments for sensitive skin',
        price: 'From $55',
      },
    ],
    team: [
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Senior Stylist',
        bio: '15+ years experience in color and cutting',
        specialties: ['Color Specialist', 'Bridal Hair'],
        image: '',
      },
      {
        id: 2,
        name: 'Maria Garcia',
        role: 'Nail Specialist',
        bio: 'Expert in nail art and luxury manicures',
        specialties: ['Nail Art', 'Gel Manicures'],
        image: '',
      },
      {
        id: 3,
        name: 'Emily Chen',
        role: 'Spa Therapist',
        bio: 'Licensed massage therapist and esthetician',
        specialties: ['Deep Tissue', 'Facials'],
        image: '',
      },
      {
        id: 4,
        name: 'Jessica Miller',
        role: 'Makeup Artist',
        bio: 'Professional makeup artist specializing in bridal looks',
        specialties: ['Bridal Makeup', 'Special Events'],
        image: '',
      },
    ],
    gallery: [
      {
        id: 1,
        category: 'Hair Styling',
        images: 8,
        description: 'Latest hair styling work',
      },
      {
        id: 2,
        category: 'Nail Art',
        images: 6,
        description: 'Creative nail designs',
      },
      {
        id: 3,
        category: 'Spa Treatments',
        images: 5,
        description: 'Relaxing spa services',
      },
      {
        id: 4,
        category: 'Salon Interior',
        images: 4,
        description: 'Our beautiful space',
      },
    ],
    packages: [
      {
        id: 1,
        name: 'Bridal Package',
        description:
          'Complete bridal beauty package including hair, makeup, and nails',
        price: '$299',
        duration: '4 hours',
        featured: true,
      },
      {
        id: 2,
        name: 'Spa Day',
        description:
          'Full day relaxation with massage, facial, and beauty treatments',
        price: '$199',
        duration: '6 hours',
        featured: false,
      },
      {
        id: 3,
        name: 'Makeover Package',
        description: 'Complete transformation with cut, color, and styling',
        price: '$149',
        duration: '3 hours',
        featured: false,
      },
    ],
    testimonials: [
      {
        id: 1,
        name: 'Emma Wilson',
        company: 'Marketing Pro',
        role: 'Manager',
        review:
          'Amazing service! The team is professional and the results are outstanding.',
        rating: 5,
        image: '',
      },
      {
        id: 2,
        name: 'Jessica Brown',
        company: 'Tech Solutions',
        role: 'CEO',
        review:
          'Highly recommend! Great experience and excellent customer service.',
        rating: 5,
        image: '',
      },
      {
        id: 3,
        name: 'Amanda Davis',
        company: 'Creative Agency',
        role: 'Designer',
        review:
          'Love coming here! The atmosphere is relaxing and staff is wonderful.',
        rating: 5,
        image: '',
      },
    ],
    reviews: [
      {
        id: 1,
        name: 'Sarah K.',
        date: '2023-12-15',
        rating: 5,
        review: 'Fantastic experience! Will definitely come back.',
        avatar: '',
      },
      {
        id: 2,
        name: 'Mike R.',
        date: '2023-12-10',
        rating: 4,
        review: 'Great service and friendly staff.',
        avatar: '',
      },
      {
        id: 3,
        name: 'Lisa M.',
        date: '2023-12-08',
        rating: 5,
        review: 'Best salon in town! Highly recommend.',
        avatar: '',
      },
    ],
    faq: [
      {
        id: 1,
        question: 'What are your hours?',
        answer:
          'We are open Monday through Saturday from 9 AM to 6 PM, and Sunday from 10 AM to 4 PM.',
      },
      {
        id: 2,
        question: 'Do you accept walk-ins?',
        answer:
          'We accept walk-ins based on availability, but appointments are recommended for guaranteed service.',
      },
      {
        id: 3,
        question: 'What payment methods do you accept?',
        answer:
          'We accept cash, credit cards, debit cards, and mobile payment apps like Apple Pay and Google Pay.',
      },
      {
        id: 4,
        question: 'Do you offer group packages?',
        answer:
          'Yes! We offer special group packages for bridal parties, birthdays, and other celebrations.',
      },
      {
        id: 5,
        question: 'What products do you use?',
        answer:
          'We use premium professional brands including Redken, OPI, Dermalogica, and other high-quality products.',
      },
    ],
    businessHours: {
      title: 'Business Hours',
      hours: {
        monday: '9:00 AM - 6:00 PM',
        tuesday: '9:00 AM - 6:00 PM',
        wednesday: '9:00 AM - 6:00 PM',
        thursday: '9:00 AM - 6:00 PM',
        friday: '9:00 AM - 6:00 PM',
        saturday: '10:00 AM - 4:00 PM',
        sunday: 'Closed',
      },
    },
    contact: {
      title: 'Get In Touch',
      description:
        'Ready to book your appointment? Contact us today and let us help you look and feel your best.',
      email: 'hello@beautysalon.com',
      phone: '(555) 123-4567',
      address: '123 Beauty Street, Salon City, SC 12345',
      socialMedia: {
        facebook: 'https://facebook.com/beautysalon',
        twitter: 'https://twitter.com/beautysalon',
        instagram: 'https://instagram.com/beautysalon',
        linkedin: 'https://linkedin.com/company/beautysalon',
      },
    },
    navigation: {
      logo: 'Beauty Salon',
      menuItems: [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Team', href: '#team' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Packages', href: '#packages' },
        { name: 'Contact', href: '#contact' },
      ],
      ownerLinkText: 'Owner Login',
    },
    footer: {
      title: 'Beauty Salon',
      description:
        'Transform your look with our expert stylists and premium beauty treatments.',
      copyright: '© 2023 Beauty Salon. All rights reserved.',
    },
  },
  gym: {
    id: 'gym',
    name: 'Elite Fitness Center',
    slug: 'gym',
    primaryColor: '#ff5722',
    hero: {
      title: 'Elite Fitness Center',
      subtitle:
        'Achieve your fitness goals with state-of-the-art equipment, expert trainers, and motivating group classes.',
      backgroundImage:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&w=1200&q=80',
    },
    about: {
      title: 'About Our Gym',
      description:
        "We're committed to helping you reach your fitness potential with personalized training programs and a supportive community.",
      extendedDescription:
        'We pride ourselves on delivering exceptional service and creating memorable experiences for all our clients. Our commitment to excellence has made us a trusted choice in the community.',
      stats: [
        { number: '500+', label: 'Active Members' },
        { number: '10+', label: 'Years Experience' },
        { number: '4.9', label: '★ Average Rating' },
        { number: '20+', label: 'Expert Trainers' },
      ],
    },
    sections: {
      services: {
        title: 'Our Services',
        subtitle:
          'We offer a comprehensive range of fitness services designed to help you achieve your health and wellness goals.',
      },
      team: {
        title: 'Meet Our Team',
        subtitle:
          'Our certified trainers and fitness professionals are here to guide you on your fitness journey.',
      },
      testimonials: {
        title: 'What Our Members Say',
        subtitle:
          "Don't just take our word for it - hear from our members about their transformation stories.",
        sampleTestimonial: {
          text: "Outstanding service and professional staff. I couldn't be happier with the results!",
          author: 'Member Name',
          role: 'Fitness Enthusiast',
        },
      },
      gallery: {
        title: 'Our Facilities',
        subtitle:
          'Take a look at our state-of-the-art equipment, group fitness studios, and member amenities.',
      },
      packages: {
        title: 'Membership Plans',
        subtitle:
          'Choose from our flexible membership options designed to fit your lifestyle and fitness goals.',
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle:
          'Find answers to common questions about memberships, classes, and gym policies.',
      },
      reviews: {
        title: 'Member Reviews',
        subtitle:
          'Read what our valued members have to say about their fitness journey with us.',
      },
    },
    ui: {
      buttons: {
        bookNow: 'Join Now',
        bookAppointment: 'Schedule Training',
        learnMore: 'Learn More',
        sendMessage: 'Send Message',
        getStarted: 'Start Your Journey',
        viewPortfolio: 'View Facilities',
        contactUs: 'Contact Us',
      },
      contactForm: {
        placeholders: {
          name: 'Your Name',
          email: 'Your Email',
          phone: 'Your Phone',
          message: 'Your Message',
        },
      },
      businessHours: {
        title: 'Gym Hours',
        contactInfoTitle: 'Contact Information',
      },
    },
    services: [
      {
        id: 1,
        icon: '🏋️',
        title: 'Personal Training',
        description: 'One-on-one sessions with certified fitness professionals',
        price: 'From $65/session',
      },
      {
        id: 2,
        icon: '🤸',
        title: 'Group Classes',
        description: 'High-energy classes including HIIT, yoga, and spin',
        price: '$20/class',
      },
      {
        id: 3,
        icon: '💪',
        title: 'Strength Training',
        description: 'Complete weight room with modern equipment',
        price: 'Included',
      },
      {
        id: 4,
        icon: '🧘',
        title: 'Yoga & Pilates',
        description: 'Mind-body classes for flexibility and core strength',
        price: '$18/class',
      },
      {
        id: 5,
        icon: '🏊',
        title: 'Swimming Pool',
        description: 'Olympic-size pool for lap swimming and water aerobics',
        price: 'Included',
      },
      {
        id: 6,
        icon: '🥊',
        title: 'Boxing Classes',
        description: 'High-intensity boxing and kickboxing training',
        price: '$25/class',
      },
    ],
    team: [
      {
        id: 1,
        name: 'Mike Thompson',
        role: 'Head Trainer',
        bio: 'Former athlete with 10+ years training experience',
        specialties: ['Strength Training', 'Athletic Performance'],
        image: '',
      },
      {
        id: 2,
        name: 'Lisa Park',
        role: 'Yoga Instructor',
        bio: 'Certified in multiple yoga disciplines',
        specialties: ['Vinyasa Yoga', 'Meditation'],
        image: '',
      },
      {
        id: 3,
        name: 'David Wilson',
        role: 'Nutritionist',
        bio: 'Sports nutrition specialist and wellness coach',
        specialties: ['Meal Planning', 'Weight Management'],
        image: '',
      },
      {
        id: 4,
        name: 'Sarah Adams',
        role: 'Group Fitness',
        bio: 'High-energy instructor specializing in HIIT and cardio',
        specialties: ['HIIT', 'Cardio Classes'],
        image: '',
      },
    ],
    gallery: [
      {
        id: 1,
        category: 'Gym Equipment',
        images: 12,
        description: 'State-of-the-art equipment',
      },
      {
        id: 2,
        category: 'Group Classes',
        images: 8,
        description: 'Dynamic fitness classes',
      },
      {
        id: 3,
        category: 'Swimming Pool',
        images: 5,
        description: 'Olympic-size pool facility',
      },
      {
        id: 4,
        category: 'Facilities',
        images: 6,
        description: 'Modern gym facilities',
      },
    ],
    packages: [
      {
        id: 1,
        name: 'Premium Membership',
        description: 'Full access to all facilities and unlimited classes',
        price: '$89/month',
        duration: 'Monthly',
        featured: true,
      },
      {
        id: 2,
        name: 'Basic Membership',
        description: 'Gym access with limited class participation',
        price: '$49/month',
        duration: 'Monthly',
        featured: false,
      },
      {
        id: 3,
        name: 'Personal Training Package',
        description: '8 personal training sessions with meal plan',
        price: '$399',
        duration: '1 Month',
        featured: false,
      },
    ],
    testimonials: [
      {
        id: 1,
        name: 'John Smith',
        company: 'Tech Corp',
        role: 'Manager',
        review:
          'Amazing gym with excellent trainers. Lost 20 pounds in 3 months!',
        rating: 5,
        image: '',
      },
      {
        id: 2,
        name: 'Maria Rodriguez',
        company: 'Healthcare Plus',
        role: 'Nurse',
        review:
          'The yoga classes are fantastic and the facility is always clean.',
        rating: 5,
        image: '',
      },
      {
        id: 3,
        name: 'Alex Chen',
        company: 'Startup Inc',
        role: 'Developer',
        review: 'Great community and motivating environment. Highly recommend!',
        rating: 5,
        image: '',
      },
    ],
    reviews: [
      {
        id: 1,
        name: 'Tom B.',
        date: '2023-12-18',
        rating: 5,
        review: 'Best gym in the area! Great equipment and friendly staff.',
        avatar: '',
      },
      {
        id: 2,
        name: 'Jennifer L.',
        date: '2023-12-15',
        rating: 5,
        review: 'Love the group classes and the pool is amazing.',
        avatar: '',
      },
      {
        id: 3,
        name: 'Carlos M.',
        date: '2023-12-12',
        rating: 4,
        review: 'Good facilities and reasonable prices.',
        avatar: '',
      },
    ],
    faq: [
      {
        id: 1,
        question: 'What are your operating hours?',
        answer:
          'We are open Monday through Friday 5 AM to 11 PM, Saturday 6 AM to 10 PM, and Sunday 7 AM to 9 PM.',
      },
      {
        id: 2,
        question: 'Do you offer trial memberships?',
        answer:
          'Yes! We offer a 7-day free trial for new members to experience all our facilities and classes.',
      },
      {
        id: 3,
        question: 'Are personal trainers included?',
        answer:
          'Personal training sessions are available for an additional fee. All our trainers are certified professionals.',
      },
      {
        id: 4,
        question: 'What should I bring for my first visit?',
        answer:
          'Bring comfortable workout clothes, athletic shoes, a water bottle, and a towel. We provide lockers and basic amenities.',
      },
      {
        id: 5,
        question: 'Do you have parking available?',
        answer:
          'Yes, we have free parking available for all members and visitors.',
      },
    ],
    businessHours: {
      title: 'Gym Hours',
      hours: {
        monday: '5:00 AM - 11:00 PM',
        tuesday: '5:00 AM - 11:00 PM',
        wednesday: '5:00 AM - 11:00 PM',
        thursday: '5:00 AM - 11:00 PM',
        friday: '5:00 AM - 11:00 PM',
        saturday: '6:00 AM - 10:00 PM',
        sunday: '7:00 AM - 9:00 PM',
      },
    },
    contact: {
      title: 'Get Started Today',
      description:
        'Ready to begin your fitness journey? Contact us to schedule a tour and start your free trial.',
      email: 'info@elitefitness.com',
      phone: '(555) 987-6543',
      address: '456 Fitness Boulevard, Gym City, GC 54321',
      socialMedia: {
        facebook: 'https://facebook.com/elitefitness',
        twitter: 'https://twitter.com/elitefitness',
        instagram: 'https://instagram.com/elitefitness',
        linkedin: 'https://linkedin.com/company/elitefitness',
      },
    },
    navigation: {
      logo: 'Elite Fitness',
      menuItems: [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Team', href: '#team' },
        { name: 'Classes', href: '#classes' },
        { name: 'Membership', href: '#packages' },
        { name: 'Contact', href: '#contact' },
      ],
      ownerLinkText: 'Staff Login',
    },
    footer: {
      title: 'Elite Fitness Center',
      description:
        'Your partner in achieving fitness goals and living a healthier lifestyle.',
      copyright: '© 2023 Elite Fitness Center. All rights reserved.',
    },
  },
  restaurant: {
    id: 'restaurant',
    name: 'Bella Vista Restaurant',
    slug: 'restaurant',
    primaryColor: '#8bc34a',
    hero: {
      title: 'Bella Vista Restaurant',
      subtitle:
        'Experience authentic Italian cuisine crafted with fresh ingredients and traditional recipes in an elegant setting.',
      backgroundImage:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&w=1200&q=80',
    },
    about: {
      title: 'Our Story',
      description:
        'Family-owned for three generations, we bring authentic Italian flavors to your table using recipes passed down through our family.',
      extendedDescription:
        'We pride ourselves on delivering exceptional service and creating memorable experiences for all our clients. Our commitment to excellence has made us a trusted choice in the community.',
      stats: [
        { number: '2500+', label: 'Meals Served' },
        { number: '25+', label: 'Years Experience' },
        { number: '4.9', label: '★ Average Rating' },
        { number: '150+', label: 'Menu Items' },
      ],
    },
    sections: {
      services: {
        title: 'Our Menu',
        subtitle:
          'We offer a comprehensive range of authentic Italian dishes crafted with fresh ingredients and traditional recipes.',
      },
      team: {
        title: 'Meet Our Chefs',
        subtitle:
          'Our experienced culinary team brings passion and expertise to every dish we create.',
      },
      testimonials: {
        title: 'What Our Guests Say',
        subtitle:
          "Don't just take our word for it - hear from our satisfied diners about their culinary experiences.",
        sampleTestimonial: {
          text: "Outstanding service and professional staff. I couldn't be happier with the results!",
          author: 'Guest Name',
          role: 'Food Enthusiast',
        },
      },
      gallery: {
        title: 'Our Restaurant',
        subtitle:
          'Take a look at our elegant dining spaces, signature dishes, and the warm atmosphere we create.',
      },
      packages: {
        title: 'Special Menus',
        subtitle:
          'Choose from our specially curated dining experiences designed for memorable occasions.',
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle:
          'Find answers to common questions about reservations, menu options, and dining policies.',
      },
      reviews: {
        title: 'Guest Reviews',
        subtitle:
          'Read what our valued guests have to say about their dining experiences with us.',
      },
    },
    ui: {
      buttons: {
        bookNow: 'Make Reservation',
        bookAppointment: 'Reserve Table',
        learnMore: 'View Menu',
        sendMessage: 'Send Message',
        getStarted: 'Make Reservation',
        viewPortfolio: 'View Gallery',
        contactUs: 'Contact Us',
      },
      contactForm: {
        placeholders: {
          name: 'Your Name',
          email: 'Your Email',
          phone: 'Your Phone',
          message: 'Special Requests or Message',
        },
      },
      businessHours: {
        title: 'Restaurant Hours',
        contactInfoTitle: 'Contact Information',
      },
    },
    services: [
      {
        id: 1,
        icon: '🍝',
        title: 'Fine Dining',
        description: 'Authentic Italian dishes made with imported ingredients',
        price: '$25-45',
      },
      {
        id: 2,
        icon: '🍷',
        title: 'Wine Selection',
        description: 'Curated collection of Italian and international wines',
        price: '$8-25/glass',
      },
      {
        id: 3,
        icon: '🎉',
        title: 'Private Events',
        description: 'Special occasions and corporate events catering',
        price: 'Custom pricing',
      },
      {
        id: 4,
        icon: '🍕',
        title: 'Wood-Fired Pizza',
        description: 'Traditional Neapolitan pizzas from our wood-fired oven',
        price: '$18-28',
      },
      {
        id: 5,
        icon: '🥗',
        title: 'Fresh Salads',
        description: 'Garden-fresh salads with imported Italian ingredients',
        price: '$12-18',
      },
      {
        id: 6,
        icon: '🍰',
        title: 'Desserts',
        description: 'Homemade Italian desserts and pastries',
        price: '$8-12',
      },
    ],
    team: [
      {
        id: 1,
        name: 'Chef Antonio',
        role: 'Executive Chef',
        bio: 'Third-generation chef from Tuscany',
        specialties: ['Pasta Making', 'Traditional Recipes'],
        image: '',
      },
      {
        id: 2,
        name: 'Isabella Rosa',
        role: 'Sommelier',
        bio: 'Wine expert with 12+ years experience',
        specialties: ['Italian Wines', 'Food Pairing'],
        image: '',
      },
      {
        id: 3,
        name: 'Marco Bianchi',
        role: 'Pastry Chef',
        bio: 'Specializes in traditional Italian desserts',
        specialties: ['Tiramisu', 'Cannoli'],
        image: '',
      },
      {
        id: 4,
        name: 'Giuseppe Rossi',
        role: 'Sous Chef',
        bio: 'Expert in regional Italian cuisines',
        specialties: ['Risotto', 'Seafood'],
        image: '',
      },
    ],
    gallery: [
      {
        id: 1,
        category: 'Signature Dishes',
        images: 15,
        description: 'Our most popular menu items',
      },
      {
        id: 2,
        category: 'Restaurant Interior',
        images: 8,
        description: 'Elegant dining atmosphere',
      },
      {
        id: 3,
        category: 'Wine Collection',
        images: 6,
        description: 'Premium wine selection',
      },
      {
        id: 4,
        category: 'Kitchen',
        images: 4,
        description: 'Our culinary workspace',
      },
    ],
    packages: [
      {
        id: 1,
        name: "Chef's Tasting Menu",
        description: '7-course tasting menu with wine pairings',
        price: '$95/person',
        duration: '2.5 hours',
        featured: true,
      },
      {
        id: 2,
        name: 'Family Style Dinner',
        description: 'Traditional family-style Italian dinner for groups',
        price: '$45/person',
        duration: '2 hours',
        featured: false,
      },
      {
        id: 3,
        name: 'Wine Dinner',
        description: '5-course dinner with premium wine selections',
        price: '$75/person',
        duration: '3 hours',
        featured: false,
      },
    ],
    testimonials: [
      {
        id: 1,
        name: 'Robert Williams',
        company: 'Food Critic',
        role: 'Reviewer',
        review:
          'Exceptional authentic Italian cuisine. The pasta is made fresh daily and the wine selection is outstanding.',
        rating: 5,
        image: '',
      },
      {
        id: 2,
        name: 'Sophie Anderson',
        company: 'Travel Blog',
        role: 'Food Blogger',
        review:
          'Feels like dining in Italy! The atmosphere and food transport you to the heart of Tuscany.',
        rating: 5,
        image: '',
      },
      {
        id: 3,
        name: 'Michael Thompson',
        company: 'Business Weekly',
        role: 'Editor',
        review:
          'Perfect for business dinners and special occasions. Impeccable service and incredible food.',
        rating: 5,
        image: '',
      },
    ],
    reviews: [
      {
        id: 1,
        name: 'Diana P.',
        date: '2023-12-20',
        rating: 5,
        review:
          'Best Italian restaurant in the city! The tiramisu is to die for.',
        avatar: '',
      },
      {
        id: 2,
        name: 'Antonio M.',
        date: '2023-12-18',
        rating: 5,
        review: "Authentic flavors that remind me of my grandmother's cooking.",
        avatar: '',
      },
      {
        id: 3,
        name: 'Jessica K.',
        date: '2023-12-15',
        rating: 4,
        review:
          'Wonderful atmosphere and delicious food. Will definitely return.',
        avatar: '',
      },
    ],
    faq: [
      {
        id: 1,
        question: 'Do you accept reservations?',
        answer:
          'Yes, we highly recommend making reservations, especially for dinner service and weekends. You can book online or call us directly.',
      },
      {
        id: 2,
        question: 'Do you accommodate dietary restrictions?',
        answer:
          'Absolutely! We offer vegetarian, vegan, and gluten-free options. Please inform us of any allergies when making your reservation.',
      },
      {
        id: 3,
        question: 'Is there parking available?',
        answer:
          'We offer complimentary valet parking in the evenings and have a public parking structure nearby.',
      },
      {
        id: 4,
        question: 'Do you cater events?',
        answer:
          'Yes, we provide catering services for private events, corporate meetings, and special occasions. Contact us for custom menus.',
      },
      {
        id: 5,
        question: 'What is your dress code?',
        answer:
          'We maintain a smart casual dress code. No shorts, flip-flops, or athletic wear during dinner service.',
      },
    ],
    businessHours: {
      title: 'Restaurant Hours',
      hours: {
        monday: 'Closed',
        tuesday: '5:00 PM - 10:00 PM',
        wednesday: '5:00 PM - 10:00 PM',
        thursday: '5:00 PM - 10:00 PM',
        friday: '5:00 PM - 11:00 PM',
        saturday: '12:00 PM - 11:00 PM',
        sunday: '12:00 PM - 9:00 PM',
      },
    },
    contact: {
      title: 'Make a Reservation',
      description:
        'Experience authentic Italian dining at its finest. Reserve your table today for an unforgettable culinary journey.',
      email: 'reservations@bellavista.com',
      phone: '(555) 456-7890',
      address: '789 Italian Way, Little Italy, LI 67890',
      socialMedia: {
        facebook: 'https://facebook.com/bellavistarestaurant',
        twitter: 'https://twitter.com/bellavistarestaurant',
        instagram: 'https://instagram.com/bellavistarestaurant',
        linkedin: 'https://linkedin.com/company/bellavistarestaurant',
      },
    },
    navigation: {
      logo: 'Bella Vista',
      menuItems: [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Menu', href: '#services' },
        { name: 'Chefs', href: '#team' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Events', href: '#packages' },
        { name: 'Reservations', href: '#contact' },
      ],
      ownerLinkText: 'Manager Login',
    },
    footer: {
      title: 'Bella Vista Restaurant',
      description:
        'Bringing authentic Italian flavors to your table with traditional recipes and modern elegance.',
      copyright: '© 2023 Bella Vista Restaurant. All rights reserved.',
    },
  },
  freelancer: {
    id: 'freelancer',
    name: 'Creative Freelancer Portfolio',
    slug: 'freelancer',
    primaryColor: '#ff9800',
    hero: {
      title: 'Creative Freelancer Portfolio',
      subtitle:
        'Transforming ideas into stunning visual experiences. Specialized in design, development, and creative solutions for modern businesses.',
      backgroundImage:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&w=1200&q=80',
    },
    about: {
      title: 'About Me',
      description:
        "I'm a passionate creative professional with 8+ years of experience helping businesses and individuals bring their visions to life through innovative design and development.",
      extendedDescription:
        'I pride myself on delivering exceptional service and creating memorable experiences for all my clients. My commitment to excellence has made me a trusted choice for businesses worldwide.',
      stats: [
        { number: '150+', label: 'Projects Completed' },
        { number: '8+', label: 'Years Experience' },
        { number: '4.9', label: '★ Average Rating' },
        { number: '95%', label: 'Client Satisfaction' },
      ],
    },
    sections: {
      services: {
        title: 'My Services',
        subtitle:
          'Professional services tailored to help your business succeed in the digital landscape.',
      },
      team: {
        title: 'My Team',
        subtitle:
          'Collaborative network of specialists I work with to deliver exceptional results.',
      },
      testimonials: {
        title: 'What My Clients Say',
        subtitle:
          "Don't just take my word for it - hear from satisfied clients about their project experiences.",
        sampleTestimonial: {
          text: "Outstanding service and professional results. I couldn't be happier with the outcome!",
          author: 'Client Name',
          role: 'Business Owner',
        },
      },
      gallery: {
        title: 'My Work',
        subtitle:
          'Explore my latest projects and creative work across various industries and platforms.',
      },
      packages: {
        title: 'Service Packages',
        subtitle:
          'Choose from my specially curated packages designed to meet your business needs and budget.',
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle:
          'Find answers to common questions about my services, process, and working together.',
      },
      reviews: {
        title: 'Client Reviews',
        subtitle:
          'Read what my valued clients have to say about working with me on their projects.',
      },
      portfolio: {
        title: 'My Portfolio',
        subtitle:
          'Explore my latest projects and creative work across various industries and platforms.',
      },
      skills: {
        title: 'My Skills',
        subtitle:
          'Technical expertise and creative abilities that I bring to every project.',
      },
      experience: {
        title: 'Experience',
        subtitle:
          'Professional journey and key roles that have shaped my expertise in design and development.',
      },
    },
    ui: {
      buttons: {
        bookNow: 'Hire Me',
        bookAppointment: 'Schedule Consultation',
        learnMore: 'Learn More',
        sendMessage: 'Send Message',
        getStarted: 'Get Started',
        viewPortfolio: 'View Portfolio',
        contactUs: 'Contact Me',
      },
      contactForm: {
        placeholders: {
          name: 'Your Name',
          email: 'Your Email',
          phone: 'Your Phone',
          message: 'Tell me about your project',
        },
      },
      businessHours: {
        title: 'Availability',
        contactInfoTitle: 'Contact Information',
      },
    },
    skills: [
      { id: 1, name: 'Web Design', level: 95, icon: '🎨' },
      { id: 2, name: 'UI/UX Design', level: 90, icon: '📱' },
      { id: 3, name: 'Frontend Development', level: 88, icon: '💻' },
      { id: 4, name: 'Graphic Design', level: 92, icon: '🖼️' },
      { id: 5, name: 'Branding', level: 85, icon: '🏷️' },
      { id: 6, name: 'Motion Graphics', level: 80, icon: '🎬' },
    ],
    portfolio: [
      {
        id: 1,
        title: 'E-commerce Platform',
        category: 'Web Development',
        description:
          'Modern e-commerce platform with custom design and seamless user experience',
        image: 'project1',
        technologies: ['React', 'Node.js', 'MongoDB'],
      },
      {
        id: 2,
        title: 'Brand Identity Design',
        category: 'Branding',
        description:
          'Complete brand identity including logo, color palette, and brand guidelines',
        image: 'project2',
        technologies: ['Illustrator', 'Photoshop', 'Figma'],
      },
      {
        id: 3,
        title: 'Mobile App UI',
        category: 'UI/UX Design',
        description:
          'Clean and intuitive mobile app interface for fitness tracking application',
        image: 'project3',
        technologies: ['Figma', 'Principle', 'Sketch'],
      },
      {
        id: 4,
        title: 'Corporate Website',
        category: 'Web Design',
        description:
          'Professional corporate website with custom animations and responsive design',
        image: 'project4',
        technologies: ['HTML/CSS', 'JavaScript', 'GSAP'],
      },
      {
        id: 5,
        title: 'Digital Marketing Campaign',
        category: 'Graphic Design',
        description:
          'Social media graphics and digital assets for marketing campaign',
        image: 'project5',
        technologies: ['Photoshop', 'After Effects', 'Illustrator'],
      },
      {
        id: 6,
        title: 'SaaS Dashboard',
        category: 'UI/UX Design',
        description:
          'Complex dashboard interface for SaaS application with data visualization',
        image: 'project6',
        technologies: ['Figma', 'React', 'D3.js'],
      },
    ],
    services: [
      {
        id: 1,
        icon: '🎨',
        title: 'Web Design',
        description:
          'Custom website design tailored to your brand and business goals',
        price: 'From $1,200',
      },
      {
        id: 2,
        icon: '📱',
        title: 'UI/UX Design',
        description: 'User-centered design for web and mobile applications',
        price: 'From $800',
      },
      {
        id: 3,
        icon: '💻',
        title: 'Frontend Development',
        description:
          'Modern, responsive websites built with latest technologies',
        price: 'From $1,500',
      },
      {
        id: 4,
        icon: '🏷️',
        title: 'Branding & Identity',
        description:
          'Complete brand identity design including logo and guidelines',
        price: 'From $900',
      },
      {
        id: 5,
        icon: '🖼️',
        title: 'Graphic Design',
        description:
          'Print and digital graphics for marketing and business materials',
        price: 'From $300',
      },
      {
        id: 6,
        icon: '🎬',
        title: 'Motion Graphics',
        description:
          'Animated graphics and video content for digital marketing',
        price: 'From $600',
      },
    ],
    experience: [
      {
        id: 1,
        company: 'Digital Agency Inc.',
        role: 'Senior Creative Designer',
        period: '2020 - Present',
        description:
          'Lead designer for major client projects, specializing in web design and branding solutions.',
      },
      {
        id: 2,
        company: 'Freelance',
        role: 'Independent Designer & Developer',
        period: '2018 - Present',
        description:
          'Providing creative solutions for startups and established businesses across various industries.',
      },
      {
        id: 3,
        company: 'Tech Startup Co.',
        role: 'UI/UX Designer',
        period: '2018 - 2020',
        description:
          'Designed user interfaces for mobile and web applications, improving user engagement by 40%.',
      },
    ],
    testimonials: [
      {
        id: 1,
        name: 'Sarah Johnson',
        company: 'Tech Innovations LLC',
        role: 'CEO',
        review:
          'Outstanding work! The website design exceeded our expectations and perfectly captured our brand vision.',
        rating: 5,
        image: '',
      },
      {
        id: 2,
        name: 'Michael Chen',
        company: 'Creative Solutions',
        role: 'Marketing Director',
        review:
          'Professional, creative, and delivers on time. The branding work has significantly improved our market presence.',
        rating: 5,
        image: '',
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        company: 'Startup Hub',
        role: 'Founder',
        review:
          'Incredible attention to detail and excellent communication throughout the project. Highly recommended!',
        rating: 5,
        image: '',
      },
    ],
    packages: [
      {
        id: 1,
        name: 'Starter Package',
        description: 'Perfect for small businesses getting started online',
        price: '$1,499',
        duration: '2-3 weeks',
        includes: [
          'Custom Web Design',
          'Responsive Layout',
          'Basic SEO',
          'Contact Forms',
        ],
        featured: false,
      },
      {
        id: 2,
        name: 'Professional Package',
        description: 'Comprehensive solution for growing businesses',
        price: '$2,999',
        duration: '4-6 weeks',
        includes: [
          'Custom Design & Development',
          'CMS Integration',
          'Advanced SEO',
          'Analytics Setup',
          'Social Media Integration',
        ],
        featured: true,
      },
      {
        id: 3,
        name: 'Enterprise Package',
        description: 'Full-scale solution for established companies',
        price: '$4,999',
        duration: '6-8 weeks',
        includes: [
          'Complete Brand Identity',
          'Custom Web Application',
          'E-commerce Integration',
          'Performance Optimization',
          'Ongoing Support',
        ],
        featured: false,
      },
    ],
    reviews: [
      {
        id: 1,
        name: 'Alex M.',
        date: '2023-12-20',
        rating: 5,
        review: 'Outstanding creativity and attention to detail.',
        avatar: '',
      },
      {
        id: 2,
        name: 'Rachel T.',
        date: '2023-12-18',
        rating: 5,
        review: 'Perfect communication and excellent results.',
        avatar: '',
      },
      {
        id: 3,
        name: 'David L.',
        date: '2023-12-15',
        rating: 5,
        review: 'Delivered exactly what we needed and more.',
        avatar: '',
      },
    ],
    faq: [
      {
        id: 1,
        question: 'What is your typical project timeline?',
        answer:
          'Project timelines vary based on scope, typically 1-6 weeks for most projects. I provide detailed timelines during our initial consultation.',
      },
      {
        id: 2,
        question: 'Do you provide ongoing support?',
        answer:
          'Yes, I offer ongoing support and maintenance packages for all projects. This includes updates, bug fixes, and content changes.',
      },
      {
        id: 3,
        question: 'What are your payment terms?',
        answer:
          'I typically require 50% upfront and 50% upon completion. For larger projects, we can arrange milestone-based payments.',
      },
      {
        id: 4,
        question: 'Do you work with international clients?',
        answer:
          'Absolutely! I work with clients worldwide and am experienced in remote collaboration using various communication tools.',
      },
      {
        id: 5,
        question: 'What do you need to get started?',
        answer:
          'I need a clear brief of your project goals, target audience, preferred style, any existing brand materials, and content/images you want to include.',
      },
    ],
    businessHours: {
      title: 'Availability',
      hours: {
        monday: '9:00 AM - 6:00 PM',
        tuesday: '9:00 AM - 6:00 PM',
        wednesday: '9:00 AM - 6:00 PM',
        thursday: '9:00 AM - 6:00 PM',
        friday: '9:00 AM - 5:00 PM',
        saturday: 'By Appointment',
        sunday: 'Closed',
      },
    },
    contact: {
      title: "Let's Work Together",
      description:
        "Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your vision to life.",
      email: 'hello@creativefreelancer.com',
      phone: '(555) 234-5678',
      address: 'Remote & Available Worldwide',
      socialMedia: {
        facebook: '',
        twitter: 'https://twitter.com/creativefreelancer',
        instagram: 'https://instagram.com/creativefreelancer',
        linkedin: 'https://linkedin.com/in/creativefreelancer',
      },
    },
    navigation: {
      logo: 'Creative Portfolio',
      menuItems: [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Skills', href: '#skills' },
        { name: 'Services', href: '#services' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
      ],
      ownerLinkText: 'Admin',
    },
    footer: {
      title: 'Creative Freelancer',
      description:
        'Transforming ideas into stunning digital experiences through creative design and development.',
      copyright: '© 2023 Creative Freelancer. All rights reserved.',
    },
  },
};

// Function to get business website data by slug (simulates API call)
export const getBusinessWebsiteData = slug => {
  return businessWebsiteData[slug] || null;
};

// Function to get all available business types
export const getAllBusinessTypes = () => {
  return Object.keys(businessWebsiteData);
};

// Function to update business data (simulates API update)
export const updateBusinessWebsiteData = (slug, updatedData) => {
  if (businessWebsiteData[slug]) {
    businessWebsiteData[slug] = {
      ...businessWebsiteData[slug],
      ...updatedData,
    };
    return businessWebsiteData[slug];
  }
  return null;
};
