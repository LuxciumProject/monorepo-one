import mongoose from 'mongoose';
import { blogSchema } from '../schemas/blog-example';

export const BlogModel = mongoose.model('Blog', blogSchema);
