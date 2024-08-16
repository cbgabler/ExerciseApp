import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditExercisePage() {
    const { id } = useParams();
    const [exercise, setExercise] = useState(null);
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/exercises/${id}`)
            .then(res => res.json())
            .then(data => {
                setExercise(data);
                setName(data.name);
                setReps(data.reps);
                setWeight(data.weight);
                setUnit(data.unit);
                setDate(data.date);
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Basic validation to check if all fields are filled out
        if (!name || !reps || !weight || !unit || !date) {
          alert('All fields are required to update the exercise.');
          return;
        }
      
        const updatedExercise = { name, reps, weight, unit, date };
      
        try {
          const response = await fetch(`/exercises/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedExercise),
          });
      
          if (response.ok) {
            alert('Exercise updated successfully!');
            navigate('/');
          } else {
            const errorData = await response.json();
            alert(`Failed to update exercise: ${errorData.message}`);
          }
        } catch (error) {
          console.error('Error updating exercise:', error);
          alert('An error occurred while updating the exercise.');
        }
      };
      

    if (!exercise) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Exercise</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Reps:
                    <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} required />
                </label>
                <label>
                    Weight:
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                </label>
                <label>
                    Unit:
                    <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                        <option value="kgs">kgs</option>
                        <option value="lbs">lbs</option>
                    </select>
                </label>
                <label>
                    Date (MM-DD-YY):
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditExercisePage;
