import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const submit = async (books) =>{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/books`,{
      method:'post',
      headers : {
        'content-type': 'application/json',
        Authorization: token
    },
    body : JSON.stringify(books)
    })
    return res.json();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submit({ title, author, description });
    setTitle('');
    setAuthor('');
    setDescription('');
    navigate('/home');
  };

  return (
    <div className='bg-gradient-to-b from-sky-300 to-violet-500 h-screen mt-0 pt-12'>
       <form className="bg-gradient-to-b from-fuchsia-300 to-purple-500 pt-7 p-4 w-1/3 bg-gray-100 shadow-md rounded mb-4 ml-96" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Add New Book</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Author</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Book
      </button>
    </form>
    </div>
   
  );
};

export default BookForm;
