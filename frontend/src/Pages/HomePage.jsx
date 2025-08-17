import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../Components/Navbar";
import NoteCard from "../Components/NoteCard";
import NotesLoading from "../Components/NotesLoading";
import RateLimited from "../Components/RateLimited";
import api from "../lib/axios";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(notes.length)

useEffect(() => {
  const fetchNotes = async () => {
    try {
      // Make sure to replace with your backend URL if needed
      const res = await api.get("/notes");
      console.log("Fetched data from backend:", res.data);

      // Check if res.data.notes exists and is an array
      if (Array.isArray(res.data.notes)) {
        setNotes(res.data.notes);
      } else if (Array.isArray(res.data)) {
        // If backend returns an array directly
        setNotes(res.data);
      } else {
        setNotes([]);
        console.warn("Notes format is unexpected:", res.data);
      }

      setIsRateLimited(false);
    } catch (error) {
      console.error("Error fetching notes:", error);

      if (error.response && error.response.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Failed to load notes. Check console for details.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  fetchNotes();
}, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimited />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && (
          <div className="text-center text-primary ">
            <NotesLoading />{" "}
          </div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
