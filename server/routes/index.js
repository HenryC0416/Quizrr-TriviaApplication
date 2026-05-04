import { Router } from 'express'
import authRoutes from './authRoutes.js'
import scoreRoutes from './scoreRoutes.js'
import questionRoutes from './questions.js'

const router = Router()

router.use('/auth', authRoutes) 
router.use("/scores", scoreRoutes);
router.use("/questions", questionRoutes);


export default router