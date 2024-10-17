import { Schema, model, Document, Types } from 'mongoose';

interface IComment extends Document {
  author: string;
  content: string;
  blogId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>({
  author: { type: String, required: true },
  content: { type: String, required: true },
  blogId: { type: Types.ObjectId, required: true, ref: 'BlogModel' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;