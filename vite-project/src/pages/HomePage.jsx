import { useEffect, useState } from 'react';
import ExerciseTable from '../components/ExerciseTable';

function HomePage() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch('/exercises')
            .then(res => res.json())
            .then(data => setExercises(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Exercise List</h2>
            <ExerciseTable exercises={exercises} />
        </div>
    );
}

export default HomePage;
