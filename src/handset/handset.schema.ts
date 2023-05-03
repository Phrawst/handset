import mongoose from "mongoose";

interface IHandsetSpec {
    display: string;
    screen_width: string;
    screen_height: string;
}
interface IHandset extends Document {
    brand: string;
    model: string;
    price: number;
    discount: string;
    discount_price: string;
    color: string;
    storage: string;
    spec: IHandsetSpec;
}

const handsetSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true,
        },
        model : {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        discount: {
            type: String,
            required: true
        },
        discount_price: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        storage: {
            type: String,
            required: true
        },
        spec: {
            display: {
                type: String,
                required: true
            },
            screen_width: {
                type: String,
                required: true
            },
            screen_height: {
                type: String,
                required: true
            }
        }
    }
);

const Handset = mongoose.model<IHandset>('Handset', handsetSchema);

export default Handset;
