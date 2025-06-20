const NotesLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-40 text-center">
      <p className="text-xl font-medium text-gray-700 mb-2">Notes loading</p>
      <div className="flex space-x-1">
        <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};

export default NotesLoading;