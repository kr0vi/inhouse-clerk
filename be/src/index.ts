import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const app = express();
const prisma = new PrismaClient({});
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/info", (req, res) => {
  res.send({
    title: "Inhouse Clerk",
    description:
      "A basic implementation of a Clerk-like authentication system built with Express and TypeScript.",
    techStack: ["Express", "TypeScript", "JWT"],
  });
});

app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return res.status(400).send({ message: "User already exists!" });
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });
  res.send({ message: "User signed up successfully! go to /login" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(400).send({ message: "User not found!" });
  }
  if (user.password !== password) {
    return res.status(400).send({ message: "Invalid password!" });
  }
  const token = jwt.sign({ userId: user.id }, "JWT_SECRET_KEY");
  res.send({ message: "User logged in successfully!", token });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
