import express, { Router } from "express";
import { handsetController } from "../handset/index"

const router: Router = express.Router();

router
    .route('/handset')
    .get(handsetController.getAllHandset);

export default router;