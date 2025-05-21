import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt:-1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller ", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const createNotes = async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content });
  await newNote.save();
  res.status(200).json({ message: " note created successfully " });
};

export const updateNote =async  (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote =await  Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });

    if (!updatedNote) {
      return res.status(404).json({ message: "Oops ! Note not found" });
    }

    res.status(200).json({ updatedNote , message: "Note Updated successfully" });
  } catch (error) {
    console.error("Error in update note middleware : ", error);
    res.status(500).json({ message: "Internal Server Error " });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Oops ! Note not found" });
    }
    res.status(200).json({ deletedNote, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in delete note middleware : ", error);
    res.status(500).json({ message: "Internal Server Error " });
  }
};


export const getNotesById = async (req,res)=>{

try {
     const reqNote = await Note.findById(req.params.id);
     if(!reqNote) return res.status(404).json({message:"Oops ! Notes not found in database"})
     
    res.status(200).json(reqNote);
} catch (error) {
    console.log("Error in getNotesById controller : ", error );
    res.status(500).json({message:"Internal Server error  "})
    
}

  

}