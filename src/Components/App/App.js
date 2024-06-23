import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from '../Layout/Layout';
import Home from '../../Pages/Home/Home';
import Strategy from '../../Pages/Strategy/Strategy';
import Login from '../../Pages/Login/Login';
import Register from '../../Pages/Register/Register';

import ProtectedRoute from '../../Routes/ProtectedRoute';
import Quiz from '../../Pages/Quiz/Quiz';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quiz" 
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute >
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/strategy"
            element={
              <ProtectedRoute >
                <Strategy />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<>Page not found</>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



