import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import './App.css';
import { Root } from './components/Root/Root';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import NewMovie from './pages/Movies/NewMovie';
import { SingleMovie } from './pages/Movies/SingleMovie';
import Header from './components/Header/Header';
import LoginPage from './pages/Login/LoginPage';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="counter" element={<Counter />} />
                <Route path="users" element={<Users />} />
                <Route path="about" element={<About />} />
                <Route path="addmovie" element={<NewMovie />} />
                <Route path="/movie/:id" element={<SingleMovie />} />
            </Routes>
        </>
    );
}

export default App;
