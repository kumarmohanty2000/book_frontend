import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookList from '../Book/BookList';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/books`, {
          headers: { Authorization: token },
        });
        setNotes(response.data);        
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchNotes();
  }, [navigate]);

  const deleteBook = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');         
        return;
      }
      await axios.delete(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/books/${id}`, {
        headers: { Authorization: token },
      });

      setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));

    } catch (err) {
      console.error(err);
      setError('Failed to delete the book. Please try again.');
    }
    console.log(notes);
  };



  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-600 text-white p-6">
        <Link to='/home' className="block px-4 py-2 rounded hover:bg-blue-700"><h2 className="text-2xl font-bold mb-6" >BookApp</h2></Link>
        <nav className="space-y-4">
        <Link to="/profile" className="block px-4 py-2 rounded hover:bg-blue-700">
            Profile
          </Link>
          <Link to="/books" className="block px-4 py-2 rounded hover:bg-blue-700">
            Books
          </Link>
          <Link to="/addbooks" className="block px-4 py-2 rounded hover:bg-blue-700">
            Add Books
          </Link>
          
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 rounded hover:bg-blue-700"
          >
            Logout
          </button>
        </nav>
      </aside>
      <main className="bg-gradient-to-b from-blue-300 to-white-500 h-screen flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">My Books</h1>
        {error && error}
        <BookList books={notes} onDelete={deleteBook}/>
      </main>
    </div>
  );
};

export default Home;
