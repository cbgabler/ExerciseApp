import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ExerciseRow({ exercise }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            alert('Exercise deleted successfully!');
            window.location.reload();
        } else {
            alert('Failed to delete exercise.');
        }
    };

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>
                <FaEdit onClick={() => navigate(`/edit/${exercise._id}`)} />
                <FaTrash onClick={handleDelete} />
            </td>
        </tr>
    );
}

export default ExerciseRow;
