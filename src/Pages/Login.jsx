import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Forminput = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) {
      setErrors(true);
      return false;
    }

    if (password.trim().length < 8) {
      setError(true);
      return;
    }

    localStorage.setItem("isLoggedIn", true);
    navigate("/productlist");
    window.location.reload();
  };

  return (
    <div
      className="container px-3 my-3"
      style={{ border: "solid", width: "400px" }}
    >
      <span className="text-center p-3">
        <h2>You have an Account ?</h2>
      </span>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        {errors && (
          <p style={{ color: "red" }}>
            "You have entered an invalid email address!"
          </p>
        )}

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
          />
        </Form.Group>
        {error && (
          <p style={{ color: "red" }}>
            Your password must contain 8 characters.
          </p>
        )}
        <br></br>
        <Button variant="dark" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>

      <br></br>
    </div>
  );
};

export default Forminput;
