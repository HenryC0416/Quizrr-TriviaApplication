import { Router } from "express";
import { createScore } from "../controllers/scoreController.js";
import { requireAuth as authMiddleware} from "../middleware/auth.js";

const router = Router();

router.post("/", authMiddleware, createScore);

export default router;