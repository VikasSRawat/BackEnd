import { returnToEditPage } from "../helper/helperFunctions.js";
import { Note } from "../Models/Notes.Model.js";

export const GetNotesapp = async (req, res) => {
  try {
    const showAll = req.query.showAll === "true";
    const notes = showAll ? await Note.find() : await Note.find().limit(5);
    let message = null;
    return res.render("index", { notes, showAll, message });
  } catch (error) {
    console.error("Error Getting the notes : ", error);
    res.status(500).send("Internal Server Error");
  }
};

export const addNote = async (req, res) => {
  console.log(req.body);
  const { title, content } = req.body;
  console.log(title);
  console.log(content);

  try {
    const result = await Note.find({ title: title });
    console.log("Length of the result " + result.length);

    if (!res.length) {
      console.log("Duplicate title \n");
      res.render("index", {
        notes: await Note.find().limit(5),
        showAll: false,
        message:
          "duplicate Title already exists, Please try to add an unique title",
      });
    }
    const note = new Note({ title, content });
    await note.save();
    console.log("Data saved succesfully");
    return res.redirect("/");
  } catch (error) {
    console.error("Error uploading data to Database\n", error);
    res.status(500).send("Internal Server Error");
    process.exit(1);
  }
};

export const deleteNote = async (req, res) => {
  const titleParam = req.params.title;

  try {
    const deleted = await Note.findOneAndDelete({ title: titleParam });
    if (deleted) {
      console.log("✅ Deleted note:", titleParam);
    } else {
      console.log("⚠️ No note found with title:", titleParam);
    }
    res.redirect("/");
  } catch (error) {
    console.error("❌ Error deleting the specific note:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const editNote = async (req, res, message) => {
  console.log("Coming Here");
  try {
    const title = req.params.title;
    const note = await Note.findOne({ title });
    console.log("The title you are finding out is ", note);
    if (!message.length) message = null;
    res.render("edit", { note, message });
  } catch (error) {
    console.error("An error has occured ", error);
  }
};


//! Updating the Note
export const updateNote = async (req, res) => {
  console.log("Updating the Note");
  console.log(req.body);

  const title = req.params.title;

  let mesg;
  try {
    const { newTitle, newContent } = req.body;
    let nTitle = title;
    let nContent = await Note.findOne({ title: title }).content;

    if (newTitle.length) {
      nTitle = newTitle;
      const result = await Note.findOne({ title: nTitle });
      console.log("result of finding out if the new title already exists ",result);

      if (result) {
        console.log("This title already exists, Please use another title");
        return await returnToEditPage(res,title,"This title already exists, Please enter a new and unique title");
        // return res.render("edit", {
        //   note: await Note.findOne({ title: title }),
        //   message:
        //     "This title already exists, Please enter a new and unique title",
        // });
      }
    }
    if (newContent.length) nContent = newContent;

    if (!nTitle.length && !nContent.length) {
      return await returnToEditPage(res,title,"Please Enter at least a new title or a new content\n");
      // return res.render("edit", {
      //   note: await Note.findOne({ title }),
      //   message: "Please Enter at least a new title or a new content\n",
      // });
    }
    await Note.updateOne(
      { title },
      { $set: { title: nTitle, content: nContent } }
    );
    console.log("Note has been updated");
  } catch (error) {
    console.error("An Error has occured ", error);
    mesg = "An error has occured while updating the note";
  }
  const showAll = false;
  const notes = showAll ? await Note.find() : await Note.find().limit(5);
  return res.render("index", {
    notes,
    showAll,
    message: mesg,
  });
};
