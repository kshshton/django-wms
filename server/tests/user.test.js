import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../index";
import * as utils from "../utils/jwtTokens";

const prisma = new PrismaClient();
let USER_ID,
  ACCESS_TOKEN = "";

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /api/user", () => {
  const getAccessToken = async (input) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: input.email },
    });
    return utils.jwtTokens(user).accessToken;
  };

  it("should create user's account", async () => {
    const payload = {
      firstName: "John",
      lastName: "McClane",
      password: "ididntdiedhard",
      email: "john192546@gmail.com",
    };

    const res = await request(app)
      .post("/api/user")
      .send(payload)
      .set("Content-Type", "application/json");

    USER_ID = res._body.id;
    ACCESS_TOKEN = await getAccessToken(payload);
  });
});

describe("GET /api/user", () => {
  it("should return all user accounts", async () => {
    const res = await request(app)
      .get("/api/user")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(200);

    expect(res.body).toEqual(expect.arrayContaining([]));
  });
});

describe("GET /api/user/:id", () => {
  it("should return user's account", async () => {
    await request(app)
      .get(`/api/user/${USER_ID}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(200);
  });
});

describe("DELETE /api/user/:id", () => {
  it("should delete user's account", async () => {
    await request(app)
      .delete(`/api/user/${USER_ID}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .set("Content-Type", "application/json");
  });
});
