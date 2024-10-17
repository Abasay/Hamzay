import mongoose, { Types } from 'mongoose'

interface IBlog extends Document {
  author: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  keywords: string[];
  content: string
  comment?: string
}

const BlogSchema = new mongoose.Schema<IBlog>({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    required: true,
    trim: true
  }],
  keywords: [{
    type: String,
    required: true,
    trim: true
  }],
  content: {
    type: String,
    required: true
  },

  comment: {
    type: Types.ObjectId,
    ref: 'Comment',
    default: null
  }
});

const Blog = mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;