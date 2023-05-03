import express, { Router } from "express";
import handsetRoute from "./handset.route";

const router = express.Router();

interface IRoute {
    path: string;
    rounte: Router;
}

const defaultIRoute: IRoute[] = [
    {
        path: '/handset',
        rounte: handsetRoute,
    }
];

defaultIRoute.forEach((route) => {
    router.use(route.path, route.rounte);
})

export default router;