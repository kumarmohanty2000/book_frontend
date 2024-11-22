import { BrowserRouter as Router,
  Route,
  Routes,
  Navigate, } from 'react-router-dom';
import Login from './components/pages/Login';
import Home from './components/pages/Home'
import BookForm from './components/Book/BookForm';
import Signup from './components/pages/Signup';
import Profile from './components/pages/Profile';
import Books from './components/pages/Books';

const App = () => {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<ProtectedRoute>
        <Home />
      </ProtectedRoute>} />
      <Route path='/addbooks' element = {<ProtectedRoute>
        <BookForm/>
      </ProtectedRoute> }/>
      <Route path='/profile' element = {<ProtectedRoute>
        <Profile/>
      </ProtectedRoute>}/>
      <Route path='/books' element = {<ProtectedRoute>
        <Books/>
      </ProtectedRoute>}/>
    </Routes>
  </Router>
  );
};

export default App;

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (token) {
    return children
  }
  else {
    return <Navigate to={'/login'} />
  }
}
