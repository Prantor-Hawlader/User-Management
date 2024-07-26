import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await signup(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/login");
    } catch (error) {
      setError("Failed to create an account");
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Sign Up</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" ref={nameRef} required className="form-control" />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            ref={emailRef}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            ref={passwordRef}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}
