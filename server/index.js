import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import addressRouter from "./routes/address-routes.js";
import authRouter from "./routes/auth-routes.js";
import customerRouter from "./routes/customer-routes.js";
import ordersRouter from "./routes/orders-routes.js";
import productsRouter from "./routes/products-routes.js";
import sectorsRouter from "./routes/sectors-routes.js";
import userRouter from "./routes/user-routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.URL || "127.0.0.1";
const corsOptions = {
  origin: ["http://localhost:5173", "10.0.2.2:8001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/sectors", sectorsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/customer", customerRouter);
app.use("/api/address", addressRouter);

app.listen(PORT, () =>
  console.log(`Server is running on: http://${URL}:${PORT}`)
);
