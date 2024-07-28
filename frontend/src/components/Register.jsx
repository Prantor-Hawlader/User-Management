import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup, error } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    await signup(
      nameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
  }

  return (
    <div>
      <MDBContainer className="h-100 mt-2">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol className="col-12 col-md-8 col-lg-6 col-xl-5">
            <MDBCard
              className="bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <MDBCardBody className="p-5 text-center h-100">
                <form onSubmit={handleSubmit}>
                  <div className="mb-md-3 mt-md-2">
                    <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                    <p className="text-white-50 mb-3">
                      Please enter your name, login and password!
                    </p>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <MDBInput
                      label="Name"
                      id="typeNameX"
                      type="text"
                      ref={nameRef}
                      size="lg"
                      className="mb-3 text-success"
                      labelClass="text-success"
                      required
                    />
                    <MDBInput
                      label="Email"
                      id="typeEmailX"
                      type="email"
                      ref={emailRef}
                      size="lg"
                      className="mb-3 text-success"
                      labelClass="text-success"
                      required
                    />
                    <MDBInput
                      label="Password"
                      id="typePasswordX"
                      type="password"
                      ref={passwordRef}
                      size="lg"
                      className="mb-3 text-success"
                      labelClass="text-success"
                      required
                    />

                    <MDBBtn outline color="light" size="lg" type="submit">
                      Register
                    </MDBBtn>
                  </div>
                </form>
                <div>
                  <p>
                    Already have an account?
                    <Link to="/login" className="text-success fw-bold">
                      Login
                    </Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
