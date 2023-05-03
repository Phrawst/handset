import httpStatus from 'http-status';
import { Request, Response} from "express";
import catchAsync from "../utils/catchAsync";
import * as handsetService from "./handset.service.ts";


export const createHandset = catchAsync(async (req: Request, res: Response) => {
    const user = await handsetService.createHandset(req.body);
    res.status(httpStatus.CREATED).send(user);
});
export const getAllHandset = catchAsync(async (req: Request, res: Response) => {
    const result = await handsetService.getAllHandset();
    res.send(result);
});