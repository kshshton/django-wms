import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../index";
import { jwtTokens } from "../utils/jwtTokens.js";

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("GET /api/products", () => {
  it("should return all products", async () => {
    const res = await request(app).get("/api/products").expect(200);
    expect(res.body).toEqual(expect.arrayContaining([]));
  });
});

describe("POST /api/products", () => {
  it("should create a product", async () => {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: "nowak@gmail.com" },
    });
    const token = jwtTokens(user);
    await request(app)
      .post("/api/products")
      .send({ id: "1" })
      .set("Authorization", `Bearer ${token.accessToken}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("PUT /api/products", () => {
  it("should update a product", async () => {
    const payload = {
      name: "Adidas",
      category: "Buty",
      quantity: 5,
      sectorName: "north",
    };
    await request(app)
      .put("/api/products/1")
      .send(payload)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("GET /api/products/:id", () => {
  it("should return a product", async () => {
    const res = await request(app).get("/api/products/1").expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });
});

describe("DELETE /api/products/:id", () => {
  it("should delete product", async () => {
    await request(app).delete("/api/products/1").expect(200);
  });
});
