import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note,setNotes }) => {

  const handleDelete=async (e,id) => {
    e.preventDefault();// to get rid of the navigation behaviour
    if(!window.confirm("are you sure to detete the note?")) return;

    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev)=>{prev.filter((note) => note._id !== id)})
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handle delete ", error );
      toast.error("failed to delete note");
      
    }
  }
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
          <button onClick={(e)=>{handleDelete(e,note._id)}} className="btn btn-ghost btn-xs text-error ">
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
