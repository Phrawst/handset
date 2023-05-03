export interface HandsetInterface {
    brand: string;
    model: string;
    price: number;
    discount: string;
    discount_price: string;
    color: string;
    storage: string;
    spec : {
        display: string;
        screen_width: string;
        screen_height: string;
    }
}