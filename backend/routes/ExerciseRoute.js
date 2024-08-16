import express from 'express';
import { createExercise, getExercises, getExerciseById, updateExerciseById, deleteExerciseById, deleteExercisesByQuery } from '../controllers/exerciseController.js';

const router = express.Router();

router.post('/', createExercise);
router.get('/', getExercises);
router.get('/:id', getExerciseById);
router.put('/:id', updateExerciseById);
router.delete('/:id', deleteExerciseById);
router.delete('/', deleteExercisesByQuery);

export default router;
