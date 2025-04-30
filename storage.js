// storage.js
const STORAGE_KEY = 'custom-notes';

// Function to get all saved notes
export const getNotes = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    throw new Error('Failed to load notes');
  }
};

// Function to save a new note
export const saveNote = (note) => {
  try {
    const existing = getNotes();
    const updated = [...existing, note];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    throw new Error('Failed to save note');
  }
};
