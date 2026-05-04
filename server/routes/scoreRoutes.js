import { Router } from "express";
import { createScore, getUserScores } from "../controllers/scoreController.js";
import { requireAuth as authMiddleware} from "../middleware/auth.js";

const router = Router();

router.post("/", authMiddleware, createScore);
router.get("/", authMiddleware, getUserScores);

export default router;