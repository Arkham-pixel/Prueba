// src/components/NoteList.js
import React, { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, archiveNote } from '../Services/noteService';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    async function fetchNotes() {
      const notes = await getNotes();
      setNotes(notes);
    }
    fetchNotes();
  }, []);

  const handleCreate = async () => {
    const note = await createNote(newNote.title, newNote.content);
    setNotes([...notes, note]);
    setNewNote({ title: '', content: '' });
  };

  const handleEdit = (note) => {
    setEditingNote(note);  // Set the note we want to edit
    setNewNote({ title: note.title, content: note.content });
  };

  const handleSaveEdit = async () => {
    const updatedNote = await updateNote(editingNote.id, newNote.title, newNote.content);
    setNotes(notes.map(note => note.id === editingNote.id ? updatedNote : note));
    setEditingNote(null);  // Clear the editing state
    setNewNote({ title: '', content: '' });
  };

  const handleArchive = async (id) => {
    await archiveNote(id);
    setNotes(notes.map(note => note.id === id ? { ...note, archived: !note.archived } : note));
  };

  return (
    <div>
      <h1>Notes</h1>
      <input
        type="text"
        value={newNote.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        placeholder="Title"
      />
      <textarea
        value={newNote.content}
        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        placeholder="Content"
      />
      <button onClick={editingNote ? handleSaveEdit : handleCreate}>
        {editingNote ? 'Save Changes' : 'Create Note'}
      </button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => handleEdit(note)}>Edit</button>
            <button onClick={() => handleArchive(note.id)}>
              {note.archived ? 'Unarchive' : 'Archive'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
