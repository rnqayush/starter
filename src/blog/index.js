// Blog Module Exports
export { default as BlogsPage } from './pages/BlogsPage';
export { default as SingleBlogPage } from './pages/SingleBlogPage';
export { default as CreateBlogModal } from './components/CreateBlogModal';

// Store exports
import blogsSliceReducer, * as blogsSliceActions from './store/blogsSlice';
export const blogsSlice = {
  reducer: blogsSliceReducer,
  actions: blogsSliceActions
};
export * from './store/blogsSlice';

// Data exports
export { default as blogsData } from './data/blogs.json';
