// import request from "supertest";
// import { intitialHandsets } from "../index";
// import mongoose from "mongoose";
// import express from "express";
// import { route } from "../route/handsets";

// const app = express();

// // Add routes to the app
// app.use("/", route);

// // Mock the mongoose connect method
// jest.mock("mongoose");
// mongoose.connect = jest.fn();

// beforeAll(() => {
//   intitialHandsets();
// });

// describe("GET /", () => {
//   it("should return a 200 response", async () => {
//     const response = await request(app).get("/");
//     expect(response.statusCode).toBe(200);
//   });
// });
