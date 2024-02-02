import mongoose, { Schema } from "mongoose";

const RATE_DOCUMENT = "rates";

const RateSchema = new Schema<IRate>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
  serviceId: { type: String, default: 'pnova', ref: 'services' },
  rate: { type: Number, required: true },
  message: { type: String },
  meta: {
    createdDate: { type: mongoose.Schema.Types.Date, default: new Date() },
    modifiedDate: { type: mongoose.Schema.Types.Date, default: new Date() },
  },
});

const Rate = mongoose.model(RATE_DOCUMENT, RateSchema);
export { RATE_DOCUMENT, RateSchema, Rate };
