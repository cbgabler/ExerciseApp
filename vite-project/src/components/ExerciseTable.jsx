import ExerciseRow from './ExerciseRow';

function ExerciseTable({ exercises }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map(exercise => (
                    <ExerciseRow key={exercise._id} exercise={exercise} />
                ))}
            </tbody>
        </table>
    );
}

export default ExerciseTable;
