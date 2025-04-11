// src/services/noteService.js

// Simulamos un almacenamiento de notas
let notes = [
    { id: 1, title: 'First Note', content: 'This is the first note.', archived: false },
    { id: 2, title: 'Second Note', content: 'This is the second note.', archived: false }
  ];
  
  // Obtener todas las notas
  export const getNotes = async () => {
    return notes;
  };
  
  // Crear una nueva nota
  export const createNote = async (title, content) => {
    const newNote = {
      id: notes.length + 1,
      title,
      content,
      archived: false
    };
    notes.push(newNote);
    return newNote;
  };
  
  // Actualizar una nota
  export const updateNote = async (id, title, content) => {
    const note = notes.find(note => note.id === id);
    if (note) {
      note.title = title;
      note.content = content;
      return note;
    }
    return null;
  };
  
  // Archivar una nota
  export const archiveNote = async (id) => {
    const note = notes.find(note => note.id === id);
    if (note) {
      note.archived = !note.archived;  // Cambia el estado de archivado
      return note;
    }
    return null;
  };
  