import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../index";
import * as utils from "../utils/jwtTokens";

const prisma = new PrismaClient();
let USER_ID,
  CUSTOMER_ID,
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
    password: "ididntdiedhard",
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

describe("GET /api/customer", () => {
  it("should return all customers", async () => {
    const res = await request(app)
      .get("/api/customer")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(200);

    expect(res.body).toEqual(expect.arrayContaining([]));
  });
});

describe("POST /api/customer", () => {
  it("should create customer's account", async () => {
    const payload = {
      firstName: "Willy",
      lastName: "Wonka",
      email: "willy215634@gmail.com",
      phone: null,
    };

    const res = await request(app)
      .post("/api/customer")
      .send(payload)
      .set("Content-Type", "application/json")
      .expect(200);

    CUSTOMER_ID = res._body.id;
  });
});

describe("PUT /api/customer/:id", () => {
  it("should update customer's data", async () => {
    const payload = {
      firstName: "Willy",
      lastName: "Wonka",
      email: "willy215634@gmail.com",
      phone: "125928126",
    };

    await request(app)
      .put(`/api/customer/${CUSTOMER_ID}`)
      .send(payload)
      .set("Content-Type", "application/json")
      .expect(200);
  });
});

describe("GET /api/customer/:id", () => {
  it("should return particular customer's data", async () => {
    const res = await request(app)
      .get(`/api/customer/${CUSTOMER_ID}`)
      .expect(200);

    expect(typeof res.body).toBe("object");
  });
});

describe("DELETE /api/customer/:id", () => {
  it("should delete customer's account", async () => {
    await request(app)
      .delete(`/api/customer/${CUSTOMER_ID}`)
      .set("Content-Type", "application/json")
      .expect(200);
  });
});
