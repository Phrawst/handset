import Handset from "./handset.schema";
import {HandsetInterface} from "./handset.interface";

export const getAllHandset = async (): Promise<HandsetInterface[]> => {
    return Handset.find();
}

export const createHandset = async (handsetBody: HandsetInterface): Promise<HandsetInterface> => {
    try {
        const newHandset = await Handset.create(handsetBody);
        return newHandset;
    } catch (error) {
        throw new Error(`Error creating handset`);
    }
}
