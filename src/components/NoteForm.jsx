import { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const NoteForm = ({ onAddNote, onUpdateNote, noteBeingEdited }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 🧠 Pre-fill form when editing
  useEffect(() => {
    if (noteBeingEdited) {
      setTitle(noteBeingEdited.title);
      setContent(noteBeingEdited.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [noteBeingEdited]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const noteData = { title, content };

    if (noteBeingEdited) {
      onUpdateNote(noteData); // 🔄 Edit note
    } else {
      onAddNote(noteData);    // ➕ Add new note
    }

    setTitle('');
    setContent('');
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-3">
          {noteBeingEdited ? '✏️ Edit Note' : '➕ Add a New Note'}
        </h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Note Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Note Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>

          <div className="text-end">
            <Button variant={noteBeingEdited ? 'warning' : 'primary'} type="submit">
              {noteBeingEdited ? 'Update Note' : 'Add Note'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NoteForm;