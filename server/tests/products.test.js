import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../index";
import * as utils from "../utils/jwtTokens";

const prisma = new PrismaClient();
let USER_ID,
  ACCESS_TOKEN = "";

beforeAll(async () => {
  await prisma.$connect();

  const getAccessToken = async (input) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: input.email },
    });
    return utils.jwtTokens(user).accessToken;
  };

  const payload = {
    firstName: "John",
    lastName: "McClane",
    password: "diehard1",
    email: "john192546@gmail.com",
  };
  const res = await request(app).post("/api/user").send(payload);

  USER_ID = res._body.id;
  ACCESS_TOKEN = await getAccessToken(payload);
});

afterAll(async () => {
  await request(app)
    .delete(`/api/user/${USER_ID}`)
    .set("Authorization", `Bearer ${ACCESS_TOKEN}`);
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
    await request(app)
      .post("/api/products")
      .send({ id: "1" })
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
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
