"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handset_route_1 = __importDefault(require("./handset.route"));
const router = express_1.default.Router();
const defaultIRoute = [
    {
        path: '/handset',
        rounte: handset_route_1.default,
    }
];
defaultIRoute.forEach((route) => {
    router.use(route.path, route.rounte);
});
exports.default = router;
