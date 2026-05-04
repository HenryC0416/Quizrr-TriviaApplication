import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createScore = async (req, res) => {
  try {
    const { userId, category, value } = req.body;

    const score = await prisma.score.create({
      data: {
        userId,
        category,
        value,
      },
    });

    res.json(score);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export async function getUserScores(req, res) {
  try {
    const scores = await prisma.score.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(scores);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}