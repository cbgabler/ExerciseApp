import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateExercisePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!name || !reps || !weight || !date) {
            alert('All fields are required.');
            return;
        }

        const exercise = {
            name: name.trim(),
            reps: parseInt(reps, 10),
            weight: parseInt(weight, 10),
            unit,
            date,
        };

        try {
            const response = await fetch('/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(exercise),
            });

            if (response.status === 400) {
                const errorData = await response.json();
                throw new Error(`Validation error: ${errorData.Error}`);
            }

            if (!response.ok) {
                throw new Error('Failed to create exercise');
            }

            const result = await response.json();
            console.log('Exercise created:', result);
            alert('Exercise created successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Create Exercise</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Reps:
                    <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
                </label>
                <label>
                    Weight:
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </label>
                <label>
                    Unit:
                    <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                        <option value="kgs">kgs</option>
                        <option value="lbs">lbs</option>
                    </select>
                </label>
                <label>
                    Date:
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <button type="submit">Create Exercise</button>
            </form>
        </div>
    );
};

export default CreateExercisePage;
