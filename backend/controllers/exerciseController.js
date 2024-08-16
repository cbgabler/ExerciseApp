import Exercise from '../models/exercise.js'; // Update import statement for ES Modules

export const createExercise = async (req, res) => {
    const { name, reps, weight, unit, date } = req.body;
  
    if (!name || !reps || !weight || !unit || !date) {
      return res.status(400).json({ Error: 'All fields are required' });
    }
    
    if (!/^\d{2}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ Error: 'Date must be in MM-DD-YY format' });
    }

    if (reps < 0 || weight < 0) {
      return res.status(400).json({ Error: 'Reps and weight must be greater than or equal to zero' });
    }
  
    try {
      const newExercise = new Exercise({ name, reps, weight, unit, date });
      await newExercise.save();
      res.status(201).json(newExercise);
    } catch (error) {
      res.status(400).json({ Error: 'Invalid request' });
    }
  };

export const getExercises = async (req, res) => {
  try {
    const query = { ...req.query };
    const exercises = await Exercise.find(query);
    res.status(200).json(exercises);
  } catch (error) {
    res.status(400).json({ Error: 'Invalid request' });
  }
};

export const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ Error: 'Not found' });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ Error: 'Invalid request' });
  }
};

export const updateExerciseById = async (req, res) => {
  const { name, reps, weight, unit, date } = req.body;

  if (!name || !reps || !weight || !unit || !date) {
    return res.status(400).json({ Error: 'All fields are required' });
  }

  if (!/^\d{2}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ Error: 'Date must be in MM-DD-YY format' });
  }

  if (reps < 0 || weight < 0) {
    return res.status(400).json({ Error: 'Reps and weight must be greater than or equal to zero' });
  }

  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!exercise) {
      return res.status(404).json({ Error: 'Not found' });
    }

    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ Error: 'Invalid request' });
  }
};


export const deleteExerciseById = async (req, res) => {
  try {
    const result = await Exercise.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ Error: 'Not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ Error: 'Invalid request' });
  }
};

export const deleteExercisesByQuery = async (req, res) => {
  try {
    const query = { ...req.query };
    const result = await Exercise.deleteMany(query);
    res.status(200).json({ deletedCount: result.deletedCount });
  } catch (error) {
    res.status(400).json({ Error: 'Invalid request' });
  }
};
