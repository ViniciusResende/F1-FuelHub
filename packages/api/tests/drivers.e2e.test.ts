import request from "supertest";
import { app } from "../src/app";

it("GET /api/drivers returns at least one active driver", async () => {
  const res = await request(app).get("/api/drivers").expect(200);
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0]).toHaveProperty("number");
  expect(res.body[0]).toHaveProperty("name");
});
