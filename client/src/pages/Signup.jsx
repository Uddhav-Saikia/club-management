import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #181a20 0%, #232946 100%);
`;

const FormContainer = styled.div`
  background: rgba(35, 41, 70, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  overflow: hidden;
  width: 350px;
  border: 1px solid rgba(255,255,255,0.08);
  margin-top: 12rem;
`;

const Header = styled.h2`
  background-color: #3498db;
  color: #fff;
  margin: 0;
  padding: 20px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const FormInput = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #fff; /* Changed text color to white */
  background-color: #222; /* Optional: dark background for better contrast */
`;



const SubmitButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  margin-bottom: 20px;

  a {
    color: #3498db;
    text-decoration: underline;

    &:hover {
      color: #2980b9;
    }
  }
`;

const Signup = () => {
  const [name, setName] = useState(""); // Step 1: Add name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup clicked!");
    // Add your signup logic here, including the 'name' field
    const userData = {
      name,
      email,
      password,
    };
    console.log(userData);

    let result = await fetch(`https://club-management-1.onrender.com/register`,{
            method:"post",
            body:JSON.stringify(userData),
            headers:{'Content-Type': 'application/json'}
        });
        result = await result.json();
        console.warn(result);
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            toast.success("SignUp Successfully", {
              position: toast.POSITION.TOP_RIGHT,
            });
        }else{
          toast.warning(result.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
    navigate("/");
  };

  return (
    <CenteredContainer>
      <div style={{ position: 'absolute', top: '7%', left: 0, width: '100%', textAlign: 'center', zIndex: 2 }}>
        <h1 style={{ color: '#eaf6ff', fontSize: '2.7rem', fontWeight: 800, letterSpacing: '0.04em', marginBottom: '0.5rem', textShadow: '0 2px 16px #181a20' }}>
          Welcome to Club Management Portal
        </h1>
        <h3 style={{ color: '#b3c7f7', fontWeight: 400, fontSize: '1.25rem', marginBottom: '2.5rem', letterSpacing: '0.02em', textShadow: '0 2px 8px #181a20' }}>
          Connect, collaborate, and manage your campus clubs with ease.
        </h3>
      </div>
      <FormContainer>
        <Header>Signup</Header>
        <SignupForm onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormInput
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton type="submit">Signup</SubmitButton>
        </SignupForm>
        <LoginLink>
          Already have an account? <Link to="/login">Login</Link>
        </LoginLink>
      </FormContainer>
    </CenteredContainer>
  );
};

export default Signup;
