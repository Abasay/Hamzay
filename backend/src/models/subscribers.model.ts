import { Schema, model, Document } from 'mongoose';

interface ISubscriber extends Document {
  email: string;
  name: string;
}

const SubscriberSchema = new Schema<ISubscriber>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

const Subscriber = model<ISubscriber>('Subscriber', SubscriberSchema);

export default Subscriber;
