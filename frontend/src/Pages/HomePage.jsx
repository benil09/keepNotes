import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../Components/Navbar";
import NoteCard from "../Components/NoteCard";
import NotesLoading from "../Components/NotesLoading";
import RateLimited from "../Components/RateLimited";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsLoading(false);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error in fetching notes", error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
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
              <NoteCard
                key={note._id}
                id={note._id}
                note={note}
                setNotes={setNotes}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
