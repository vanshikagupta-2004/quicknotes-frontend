import { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth(); // ✅ Update login state
  const navigate = useNavigate(); // ✅ Redirect to dashboard

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccess(false);
    setShowError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // 🧠 Save JWT token
        setShowSuccess(true);
        login(); // 🧠 Update AuthContext
        navigate('/dashboard'); // 🚀 Redirect user
      } else {
        setShowError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setShowError('Server error. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card className="shadow-sm p-4">
            <h4 className="mb-4 text-center">🔐 Login to Your Account</h4>

            {showSuccess && (
              <Alert variant="success" className="text-center">
                ✅ Logged in successfully!
              </Alert>
            )}
            {showError && (
              <Alert variant="danger" className="text-center">
                ❌ {showError}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                  Log In
                </Button>
              </div>
            </Form>

            <div className="text-center mt-3">
              <span className="text-muted">Not registered yet? </span>
              <Link to="/signup">Create an Account</Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;