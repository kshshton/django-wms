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
    password: "diehard1",
    email: "john192546@gmail.com",
  };
  const userResponse = await request(app).post("/api/user").send(userData);

  USER_ID = userResponse._body.id;
  ACCESS_TOKEN = await getAccessToken(userData);

  const customerData = {
    firstName: "John",
    lastName: "Travolta",
    email: "johntrav@gmail.com",
    phone: null,
  };

  const customerResponse = await request(app)
    .post("/api/customer")
    .send(customerData)
    .set("Content-Type", "application/json")
    .expect(200);

  CUSTOMER_ID = customerResponse._body.id;

  const addressData = {
    id: "2",
    city: "Warszawa",
    state: "mazowieckie",
    streetName: "Zielona",
    buildingNumber: "8A",
    apartmentNumber: "",
    customerEmail: "johntrav@gmail.com",
  };

  await request(app)
    .post("/api/address")
    .set("Content-Type", "application/json")
    .send(addressData);
});

afterAll(async () => {
  await request(app)
    .delete(`/api/user/${USER_ID}`)
    .set("Authorization", `Bearer ${ACCESS_TOKEN}`);
  await request(app).delete(`/api/customer/${CUSTOMER_ID}`);
  await request(app).delete("/api/address/2");
  await prisma.$disconnect();
});

describe("GET /api/orders", () => {
  it("should return all orders", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(200);

    expect(res.body).toEqual(expect.arrayContaining([]));
  });
});

describe("POST /api/orders", () => {
  it("should create an order", async () => {
    const payload = {
      id: "1",
      addressId: "2",
    };

    await request(app)
      .post("/api/orders")
      .send(payload)
      .set("Accept", "application/json")
      .expect(200);
  });
});

describe("PUT /api/order/:id", () => {
  it("should update an order", async () => {
    const payload = {
      complete: true,
      userId: USER_ID,
    };

    await request(app)
      .put("/api/orders/1")
      .send(payload)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .set("Accept", "application/json")
      .expect(200);
  });
});

describe("GET /api/orders/:id", () => {
  it("should return an order", async () => {
    const res = await request(app).get("/api/orders/1").expect(200);

    expect(typeof res).toBe("object");
  });
});

describe("GET /api/orders/:id/cart", () => {
  it("should return cart of an order", async () => {
    const res = await request(app).get("/api/orders/1/cart").expect(200);

    expect(typeof res).toBe("object");
  });
});

describe("GET /api/orders/:id/address", () => {
  it("should return address of an order", async () => {
    const res = await request(app).get("/api/orders/1/address").expect(200);

    expect(typeof res).toBe("object");
  });
});

describe("GET /api/orders/:id/customer", () => {
  it("should return customer of an order", async () => {
    const res = await request(app).get("/api/orders/1/customer").expect(200);

    expect(typeof res).toBe("object");
  });
});

describe("DELETE /api/orders/:id", () => {
  it("should delete an order", async () => {
    await request(app).delete("/api/orders/1").expect(200);
  });
});
