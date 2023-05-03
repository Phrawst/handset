import { Schema, model } from "mongoose";

interface Handset {
  id: String;
  brand: String;
  model: String;
  price: Number;
  discount: String;
  discounted_price: Number;
  color: String;
  storage: String;
  spec: {
    display: String;
    screen_width: String;
    screen_height: String;
  };
}
interface HandsetSpec {
  display: String;
  screen_width: String;
  screen_height: String;
}
interface HandsetDocument extends Document {
  id: Number;
  brand: String;
  model: String;
  price: String;
  color: String;
  storage: String;
  spec: HandsetSpec;
}

const handsetSchema = new Schema<Handset>({
  id: { type: Number },
  brand: { type: String },
  model: { type: String },
  price: { type: String },
  color: { type: String },
  storage: { type: String },
  spec: {
    type: {
      display: { type: String },
      screen_width: { type: String },
      screen_height: { type: String },
    },
  },
});
handsetSchema.statics.findOneById = async function (
  id: String
): Promise<HandsetDocument | null> {
  return this.findOne({ id }).exec();
};

const Handset = model<Handset>("handsets", handsetSchema);

export { Handset };
