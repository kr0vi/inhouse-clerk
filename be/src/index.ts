import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt, { type JwtPayload } from "jsonwebtoken";
const app = express();
const prisma = new PrismaClient({});
app.use(cors());

app.use(express.json());

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

app.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "No token provided!", success: false });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "No token provided!", success: false });
  }
  try {
    const decoded: JwtPayload = jwt.verify(
      token,
      "JWT_SECRET_KEY",
    ) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user) {
      return res.status(404).send({ message: "User not found!", success: false });
    }
    res.send({ user: { id: user.id, email: user.email, name: user.name }, success: true });
  } catch (err) {
    return res.status(401).send({ message: "Invalid token!", success: false });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
