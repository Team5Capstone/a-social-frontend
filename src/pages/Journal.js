import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Journal.css';

const API = process.env.REACT_APP_API_URL;

function Journal() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    title: '',
    mood: '',
    date: '',
    content: '',
    user_id: Number(localStorage.getItem('a-social'))
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/journals`)
      .then((res) => {
        setJournalEntries(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCreateEntry = () => {
    axios
      .post(`${API}/journals`, newEntry)
      .then((res) => {
        setJournalEntries([...journalEntries, res.data]);
        setNewEntry({
          title: '',
          mood: '',
          date: '',
          content: '',
          user_id: Number(localStorage.getItem('a-social'))
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setShowModal(false);
  };

  const handleEditEntry = () => {
    const { id, title, mood, date, content, user_id } = newEntry;

    axios
      .put(`${API}/journals/${id}`, {
        title,
        mood,
        date,
        content,
        user_id
      })
      .then(() => {
        const updatedEntries = journalEntries.map((entry) =>
          entry.id === id ? { ...entry, title, mood, date, content } : entry
        );
        setJournalEntries(updatedEntries);
        setNewEntry({
          id: null,
          title: '',
          mood: '',
          date: '',
          content: '',
          user_id: Number(localStorage.getItem('a-social'))
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setShowModal(false);
  };

  const handleDeleteEntry = (entryId) => {
    axios
      .delete(`${API}/journals/${entryId}`)
      .then(() => {
        const updatedEntries = journalEntries.filter(
          (entry) => entry.id !== entryId
        );
        setJournalEntries(updatedEntries);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const openEditModal = (entry) => {
    setNewEntry({
      id: entry.id,
      title: entry.title,
      mood: entry.mood,
      date: entry.date,
      content: entry.content,
      user_id: Number(localStorage.getItem('a-social'))
    });
    setShowModal(true);
  };

  return (
    <div>
      <h1>My Journal</h1>
      {journalEntries.map((entry) => {
        if (entry.user_id === newEntry.user_id) {
          return (
            <div key={entry.id}>
              <p>{entry.title}</p>
              <p>{entry.mood}</p>
              <p>{entry.date}</p>
              <p>{entry.content}</p>
              <button onClick={() => openEditModal(entry)}>Edit</button>
              <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
            </div>
          );
        }
        return null;
      })}
      <button onClick={() => setShowModal(true)}>Create New Entry</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{!selectedEntryId ? 'Edit' : 'Create New'} Journal Entry</h2>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={newEntry.title}
              onChange={(e) =>
                setNewEntry({ ...newEntry, title: e.target.value })
              }
            />
            <label htmlFor="mood">Mood:</label>
            <input
              type="text"
              id="mood"
              placeholder="Mood"
              value={newEntry.mood}
              onChange={(e) =>
                setNewEntry({ ...newEntry, mood: e.target.value })
              }
            />
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              placeholder="Date"
              value={newEntry.date}
              onChange={(e) =>
                setNewEntry({ ...newEntry, date: e.target.value })
              }
            />
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              placeholder="Content"
              value={newEntry.content}
              onChange={(e) =>
                setNewEntry({ ...newEntry, content: e.target.value })
              }
            ></textarea>
            <button
              onClick={() =>
                selectedEntryId
                  ? handleEditEntry(selectedEntryId)
                  : handleCreateEntry()
              }
            >
              {selectedEntryId ? 'Update Entry' : 'Save Entry'}
            </button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Journal;








