import { Card, Button } from 'react-bootstrap';

const NoteList = ({ notes, onDeleteNote, onEditNote }) => {
  return (
    <div>
      {notes.length === 0 ? (
        <p className="text-muted text-center">
          No notes yet. Start writing something brilliant! ✨
        </p>
      ) : (
        notes.map((note) => (
          <Card key={note._id} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>{note.title}</Card.Title>
              <Card.Text>{note.content}</Card.Text>
              <div className="text-end">
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => onEditNote(note)}
                >
                  ✏️ Edit
                </Button>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDeleteNote(note._id)}
                >
                  🗑️ Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default NoteList;