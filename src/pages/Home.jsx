import { Container, Row, Col, Button } from 'react-bootstrap';
import quicknotesImage from '../assets/quicknotes.jpeg'; // ✅ Make sure this path is correct

const Home = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #f4f8ff 0%, #ffffff 100%)',
        minHeight: '100vh',
        paddingTop: '5rem',
      }}
    >
      <Container>
        <Row className="align-items-center justify-content-center">
          {/* ✏️ Left Column – Text */}
          <Col md={6} className="mb-5 text-center text-md-start">
            <h1 className="fw-bold display-4 text-primary mb-3">QuickNotes</h1>
            <p className="lead text-secondary">
              Every idea deserves a space. Every mind deserves clarity.
            </p>
            <p className="text-muted">
              Whether you're coding your next app, preparing for interviews, or capturing
              late-night thoughts — <strong>QuickNotes</strong> is here to simplify your thinking
              and empower your creativity.
            </p>
            <p className="text-muted">
              No clutter. No confusion. Just a beautiful place to <em>write, reflect, and grow</em>.
            </p>
            <Button variant="primary" href="/signup" className="mt-3 px-4 py-2">
              Start Your Journey ➜
            </Button>
          </Col>

          {/* 🖼️ Right Column – Illustration */}
          <Col md={6} className="text-center">
            <img
              src={quicknotesImage}
              alt="Workspace illustration"
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: '420px', objectFit: 'cover', borderRadius: '12px' }}
            />
            <small className="text-muted d-block mt-3">
              Built by Vanshika with love, focus, and purpose 🌸
            </small>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;