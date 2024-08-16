import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';

function App() {
    return (
        <Router>
            <div>
                <header>
                    <h1>Exercise Tracker</h1>
                    <p>This app will track all of your exercises. You can edit, add, and delete any exercise. Keep the weight and reps above 0 and follow the MM-DD-YY format for dates.</p>
                </header>
                <Navigation />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/create" element={<CreateExercisePage />} />
                        <Route path="/edit/:id" element={<EditExercisePage />} />
                    </Routes>
                </main>
                <footer>
                    <p>© 2024 Carson Gabler</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
