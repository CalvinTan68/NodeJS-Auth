const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = process.env.SECRET_KEY;

const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" });
};

module.exports = {
  loginUser: async (req, res) => {
    const body = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!user) {
        res.status(404).json({ msg: "User not found" });
        return;
      }
      const isPasswordValid = await bcrypt.compare(
        body.password,
        user.password
      );
      if (!isPasswordValid) {
        res.status(401).json({ msg: "Invalid Password" });
        return;
      }
      const token = generateToken(user);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  registerUser: async (req, res) => {
    const body = req.body;
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (existingUser) {
        res.status(400).json({ msg: "Email already in use" });
        return;
      }
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const newUser = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashedPassword,
        },
      });
      const token = generateToken(newUser);
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
