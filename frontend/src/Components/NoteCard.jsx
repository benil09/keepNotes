import { PenSquareIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import { formatDate } from "../lib/utils";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card  hover:border-pink-500 transition-all duration-600
    border-t-4 border-solid border-[#ABE900]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content ">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4 ">
          <span>{formatDate(note.createdAt)}</span>
        </div>
        <div className="flex items-center text-blue-400 gap-1">
          <PenSquareIcon className="size-4" />
          <button
            onClick={(e) => {
              handleDelete(e, note._id);
            }}
            className="btn btn-ghost btn-xs text-error "
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
