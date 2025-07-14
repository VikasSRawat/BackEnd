import express from 'express';
import { GetNotesapp ,addNote, deleteNote, editNote, updateNote} from '../Controllers/Notes.Controller.js';


const router = express.Router();

router.get("/",GetNotesapp)

router.post("/add",addNote);

router.post("/delete/:title",deleteNote);

router.get("/edit/:title",editNote);

router.post("/update/:title",updateNote);



export const NotesRouter = router;