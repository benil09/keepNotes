import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";


const NoteCard = ({note}) => {


  return (
    <Link to={`/note/${NoteCard._id}`} className="card  hover:shadow-lg transition-all duration-200
    border-t-4 border-solid border-[#ABE900]"> 
    <div className="card-body">
        <h3 className="card-title text-base-content ">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4 ">
            <span>{formatDate(note.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4"/>
            <button className="btn btn-ghost btn-xs text-error ">
                <Trash2Icon className="size-4"/> 
            </button>

        </div>
        
    </div>
    
    </Link>



  )
}

export default NoteCard
