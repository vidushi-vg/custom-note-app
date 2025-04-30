import { useEffect, useState } from 'react';
import { getNotes } from '../utils/storage';

export default function NotesList({ refreshTrigger }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    try {
      const savedNotes = getNotes();
      setNotes(savedNotes);
    } catch (err) {
      console.error('Error loading notes:', err.message);
    }
  }, [refreshTrigger]); // re-run when refreshTrigger changes

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Notes</h2>
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note, index) => (
            <li key={index} className="border p-3 rounded shadow">
              <h3 className="font-semibold">{note.title}</h3>
              <p className="text-gray-600">
                {note.content.length > 100
                  ? note.content.slice(0, 100) + '...'
                  : note.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Why useEffect to sync storage → state:
// useEffect ensures we read from localStorage only when the component mounts or when new data is added.
