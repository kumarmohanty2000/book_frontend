const BookList = ({ books, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div
          key={book._id}
          className="bg-gradient-to-b from-cyan-300 to-neutral-200 p-4 border rounded shadow-md flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-bold mb-2">{book.title}</h3>
            <p className="text-gray-700 italic mb-2">By: {book.author}</p>
            <p className="text-gray-600">{book.description}</p>
          </div>
          <button
            onClick={() => onDelete(book._id)}
            className="mt-4 bg-gradient-to-b from-red-500 to-slate-300 text-white py-1 px-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
