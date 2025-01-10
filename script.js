const addBtn = document.querySelector("#addBtn");
const container = document.querySelector("#container");

addBtn.addEventListener("click", function () {
  addNote();
});
const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea");
  console.log(notes); // display only Nodelist

  const data = [];
  notes.forEach((note) => {
    data.push(note.value);
  });
  // console.log(data)   // actual contents is showing
  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
    // store data in localStorage
  }
};

const addNote = (text ="") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
  <div class="tool">
 <i class="trash fa-solid fa-trash">
 </i> 
 <i class="save fa-solid fa-floppy-disk"></i>
 </div>
 <textarea>${text}</textarea>
 `;
  // remove logic
  note.querySelector(".trash").addEventListener("click", function () {
    note.remove();
    // if data removed showing in local storage
    saveNotes();
  });
  // save logic
  note.querySelector(".save").addEventListener("click", function () {
    saveNotes();
  });
  note.querySelector("textarea").addEventListener("focusout", function () {
    saveNotes();
  });
  container.appendChild(note);
  saveNotes();
};
// The IIFE ensures that this initialization logic runs immediately when the script loads, thus restoring the user's saved notes from a previous session. This way, users can close and reopen the browser, and their notes will still be there.
(function () {
  const lnotes = JSON.parse(localStorage.getItem("notes"));
  if (lnotes === null) {
    addNote();
  } else {
    lnotes.forEach((lnotes) => addNote(lnotes));
  }
  // console.log(lnotes)
})();
