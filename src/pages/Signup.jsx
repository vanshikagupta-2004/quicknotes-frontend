import { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccess(false);
    setShowError("");

    try {
      const response = await fetch(
        "https://quicknotes-backend-cy6e.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );
      // const response = await fetch('http://localhost:5000/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password })
      // });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setShowError(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setShowError("Server error. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card className="shadow-sm p-4">
            <h4 className="mb-4 text-center">📝 Create an Account</h4>

            {/* ✅ Alerts */}
            {showSuccess && (
              <Alert variant="success" className="text-center">
                ✅ Sign Up Successfully!
              </Alert>
            )}
            {showError && (
              <Alert variant="danger" className="text-center">
                ❌ {showError}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

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
                  placeholder="Choose a strong password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {/* 🎯 Centered Submit Button */}
              <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </div>
            </Form>

            {/* 🔗 Link to Login Page */}
            <div className="text-center mt-3">
              <span className="text-muted">Already have an account? </span>
              <Link to="/login">Log In</Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
