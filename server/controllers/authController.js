import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();


export const register = async (req, res) => {
  try {

    const { username, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password required' })
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await prisma.user.create({
      data: { username, email, password },
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" })
    }
    
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};