import { Router } from "express";
import { createScore } from "../controllers/scoreController.js";

const router = Router();

router.post("/", createScore);

export default router;