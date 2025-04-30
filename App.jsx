import { useState } from 'react';
import AddNote from './components/AddNote';
import NotesList from './components/NotesList';

function App() {
  const [page, setPage] = useState('add'); // 'add' or 'view'
  const [refreshTrigger, setRefreshTrigger] = useState(0); // to re-trigger NotesList on add

  const handleNoteAdded = () => {
    setRefreshTrigger((prev) => prev + 1); // force refresh NotesList
    setPage('view'); // switch to view after saving
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <nav className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setPage('add')}
          className={`px-4 py-2 rounded ${
            page === 'add' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Add Note
        </button>
        <button
          onClick={() => setPage('view')}
          className={`px-4 py-2 rounded ${
            page === 'view' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          View Notes
        </button>
      </nav>

      {page === 'add' ? (
        <AddNote onNoteAdded={handleNoteAdded} />
      ) : (
        <NotesList refreshTrigger={refreshTrigger} />
      )}
    </div>
  );
}

// Why this nav approach for simplicity:
// Simple state toggle with buttons avoids external libraries or routing complexity.

export default App;
