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

describe("GET /api/sectors", () => {
  it("should return all sectors", async () => {
    const res = await request(app)
      .get("/api/sectors")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(200);

    expect(res.body).toEqual(expect.arrayContaining([]));
  });
});

describe("POST /api/sectors", () => {
  it("should create a sector", async () => {
    const payload = {
      id: "99",
      name: "north-east",
    };

    await request(app)
      .post("/api/sectors")
      .send(payload)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("PUT /api/sectors/:id", () => {
  it("should update a sector", async () => {
    const payload = {
      id: "99",
      name: "north-west",
    };

    await request(app)
      .put("/api/sectors/99")
      .send(payload)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("GET /api/sectors/:id", () => {
  it("should return a sector", async () => {
    await request(app)
      .get("/api/sectors/99")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(200);
  });
});

describe("DELETE /api/sectors/:id", () => {
  it("should delete a sector", async () => {
    await request(app)
      .delete("/api/sectors/99")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(200);
  });
});
