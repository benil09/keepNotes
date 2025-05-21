import express from "express"
import { deleteNote, getAllNotes,getNotesById, createNotes, updateNote } from "../Controllers/notes.controller.js";


const router = express.Router()


router.get("/",getAllNotes)
router.get("/:id",getNotesById)
router.post("/",createNotes)
router.put("/:id",updateNote)
router.delete("/:id",deleteNote)



 export default router