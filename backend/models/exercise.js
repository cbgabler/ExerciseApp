import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true, min: [0.1, 'Weight must be greater than zero'] },
  unit: { type: String, required: true, enum: ['kgs', 'lbs'] },
  date: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2}-\d{2}-\d{2}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid date format. Use MM-DD-YY.`,
    },
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
