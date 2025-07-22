import { useState, useEffect } from 'react';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteBeingEdited, setNoteBeingEdited] = useState(null); // 🌟 Track note to edit

  const token = localStorage.getItem('token');

  // 🔃 Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/notes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error('Error fetching notes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [token]);

  // ➕ Add new note
  const handleAddNote = async (note) => {
    try {
      const res = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(note)
      });

      const newNote = await res.json();
      setNotes([...notes, newNote]);
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  // 🗑️ Delete note
  const handleDeleteNote = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  // ✏️ Edit note: populate form
  const handleEditNote = (note) => {
    setNoteBeingEdited(note);
  };

  // 🔄 Update note
  const handleUpdateNote = async (updatedNote) => {
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${noteBeingEdited._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedNote)
      });

      const result = await res.json();

      setNotes(notes.map((note) =>
        note._id === result._id ? result : note
      ));
      setNoteBeingEdited(null); // Reset form
    } catch (err) {
      console.error('Error updating note:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">📋 Your Notes Dashboard</h3>

      <NoteForm
        onAddNote={handleAddNote}
        onUpdateNote={handleUpdateNote}
        noteBeingEdited={noteBeingEdited}
      />

      {loading ? (
        <p className="text-muted text-center">🔄 Loading your saved notes...</p>
      ) : (
        <NoteList
          notes={notes}
          onDeleteNote={handleDeleteNote}
          onEditNote={handleEditNote} // 👈 Pass down
        />
      )}
    </div>
  );
};

export default Dashboard;