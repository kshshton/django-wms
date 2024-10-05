import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../index";
import * as utils from "../utils/jwtTokens";

const prisma = new PrismaClient();

let USER_ID,
  ACCESS_TOKEN,
  REFRESH_TOKEN = "";

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

describe("POST /api/auth/login", () => {
  it("should create session with jwt tokens", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send({ email: "john192546@gmail.com", password: "diehard1" })
      .expect(200);

    REFRESH_TOKEN = res._body.tokens.refreshToken;
  });
});

describe("POST /api/auth/refresh_token", () => {
  it("should refresh tokens", async () => {
    await request(app)
      .post("/api/auth/refresh_token")
      .set("Content-Type", "application/json")
      .send({ refreshToken: REFRESH_TOKEN })
      .expect(200);
  });
});

describe("DELETE /api/auth/refresh_token", () => {
  it("should delete refresh_token", async () => {
    await request(app).delete("/api/auth/refresh_token").expect(200);
  });
});
