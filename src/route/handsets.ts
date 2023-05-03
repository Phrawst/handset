import { Handset } from "../model/handsets";
import { Router } from "express";
// import * as kafkaMiddleWare from "../services/kafkaMiddleWare";

const Joi = require("Joi");
const HANDSET_ERROR_MESSAGES = {
  400: "Bad request. Please check the request payload and try again.",
  401: "Unauthorized. Please provide a valid authentication token.",
  403: "Forbidden. You do not have sufficient permissions to perform this action.",
  404: "The handset not found, please check if the provided id is correct.",
  409: "Conflict. The request conflicts with the current state of the resource.",
  500: "Internal server error. Please try again later.",
};

const handsetSchema = Joi.object({
  id: Joi.number().required(),
  brand: Joi.string().required(),
  model: Joi.string().required(),
  price: Joi.number().required(),
  color: Joi.string().required(),
  storage: Joi.string().required(),
  spec: Joi.object({
    display: Joi.string().required(),
    screen_width: Joi.number().required(),
    screen_height: Joi.number().required(),
  }).required(),
});

const topic = "handsets-created";
const parser = require("body-parser");

// kafkaMiddleWare.initializeKafka();
const route = Router();
route.use(parser.json());
route.use(parser.urlencoded({ extended: true }));

route.get("/handsets", async (_, res) => {
  const handsets = await Handset.find();
  res.json(handsets);
});

route.get("/handsets/:id", async (req, res) => {
  let handset = await Handset.findById(req.params.id);
  if (!handset) {
    res.status(404).json({ error: "handset not found" });
  } else {
    res.json(handset);
  }
});

route.post("/handsets", async (req, res) => {
  const {
    id,
    brand,
    model,
    price,
    discount,
    discounted_price,
    color,
    storage,
    spec: { display, screen_width, screen_height },
  } = req.body;

  let handset = new Handset({
    id: id,
    brand: brand,
    model: model,
    price: price,
    discount: discount,
    discounted_price: discounted_price,
    color: color,
    storage: storage,
    spec: {
      display: display,
      screen_width: screen_width,
      screen_height: screen_height,
    },
  });

  const { error } = handsetSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const existinghandset = await Handset.findOne({ id: id });
  if (!existinghandset) {
    // kafkaMiddleWare.sendHandsetJson(topic, handset.toObject());
    await handset.save();
    return res.json(handset);
  }

  return res.status(409).json({ error: HANDSET_ERROR_MESSAGES[409] });
});

route.delete("/handsets/:id", async (req, res) => {
  let handset = await Handset.findByIdAndRemove(req.params.id);

  if (!handset) {
    res.status(404).json({
      error:
        "The handset not found, please check if the provided id is correct.",
    });
  } else {
    res.json(handset);
  }
});

export { route };
