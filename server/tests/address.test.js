import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../index";
import * as utils from "../utils/jwtTokens";

const prisma = new PrismaClient();
let ACCESS_TOKEN,
  USER_ID,
  CUSTOMER_ID = "";

beforeAll(async () => {
  await prisma.$connect();

  const getAccessToken = async (input) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: input.email },
    });
    return utils.jwtTokens(user).accessToken;
  };

  const userData = {
    firstName: "John",
    lastName: "McClane",
    password: "ididntdiedhard",
    email: "john192546@gmail.com",
  };
  const userResponse = await request(app).post("/api/user").send(userData);

  USER_ID = userResponse._body.id;
  ACCESS_TOKEN = await getAccessToken(userData);

  const customerData = {
    firstName: "John",
    lastName: "McClane",
    email: "john192546@gmail.com",
    phone: "",
  };
  const customerResponse = await request(app)
    .post("/api/customer")
    .send(customerData);

  CUSTOMER_ID = customerResponse._body.id;
});

afterAll(async () => {
  await request(app)
    .delete(`/api/user/${USER_ID}`)
    .set("Authorization", `Bearer ${ACCESS_TOKEN}`);
  await request(app).delete(`/api/customer/${CUSTOMER_ID}`);
  await prisma.$disconnect();
});

describe("GET /api/address", () => {
  it("should return all addresses", async () => {
    const res = await request(app)
      .get("/api/address")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(200);

    expect(res.body).toEqual(expect.arrayContaining([]));
  });
});

describe("POST /api/address", () => {
  it("should create an address", async () => {
    const payload = {
      id: "1",
      city: "Warszawa",
      state: "mazowieckie",
      streetName: "Zielona",
      buildingNumber: "8A",
      apartmentNumber: "",
      customerEmail: "john192546@gmail.com",
    };

    await request(app)
      .post("/api/address")
      .send(payload)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("PUT /api/address/:id", () => {
  it("should update an address", async () => {
    const payload = {
      city: "Kraków",
      state: "małopolskie",
      streetName: "Czerwona",
      buildingNumber: "15",
      apartmentNumber: "36",
      customerEmail: "john192546@gmail.com",
    };

    await request(app)
      .put("/api/address/1")
      .send(payload)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("GET /api/address/:id", () => {
  it("should return an address", async () => {
    const res = await request(app).get("/api/address/1").expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });
});

describe("DELETE /api/address/:id", () => {
  it("should delete an address", async () => {
    await request(app).delete("/api/address/1").expect(200);
  });
});
