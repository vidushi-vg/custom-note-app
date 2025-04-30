import { useState } from 'react';
import { saveNote } from '../utils/storage';

export default function AddNote({ onNoteAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      saveNote({ title, content });
      setTitle('');
      setContent('');
      setError(null);
      onNoteAdded(); // Tell parent to refresh the note list
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Add a New Note</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
        className="w-full p-2 border rounded"
      ></textarea>

      {saving && <p className="text-blue-600">Saving...</p>} {/* // Why show spinner here: Feedback during async save */}
      {error && <p className="text-red-600">{error}</p>}     {/* // Why display error banner: Shows if localStorage write fails */}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Note
      </button>
    </form>
  );
}

// Why I chose useState + this submit handler:
// useState manages form state cleanly, and the handler lets me update localStorage and reset inputs on submit.
