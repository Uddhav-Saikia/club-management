import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const PageBg = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #181a20 0%, #232946 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 3rem 0;
  padding: 2.5rem 2.5rem 1.5rem 2.5rem;
  background: rgba(35, 41, 70, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255,255,255,0.08);
  color: #eaf6ff;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  flex: 1;
  margin-right: 20px;
  font-weight: bold;
  color: #b8c1ec;
`;

const Value = styled.p`
  flex: 2;
  color: #fff;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin: 10px 0 20px 0;
  border-radius: 6px;
  border: 1px solid #444;
  background: #232946;
  color: #eaf6ff;
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid #3498db;
    outline: none;
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #3498db, #2980b9);
  color: #fff;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  box-shadow: 0 2px 8px rgba(52,152,219,0.08);
  transition: background 0.3s, box-shadow 0.3s;

  &:hover {
    background: linear-gradient(90deg, #2980b9, #3498db);
    box-shadow: 0 4px 16px rgba(52,152,219,0.18);
  }
`;

const Settings = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState(auth.name);
  const [email, setEmail] = useState(auth.email);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if(newPassword!==confirmNewPassword){
      toast.warning("Password and confirm Password is not same", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return ;
    }
    try {
      const userId = auth._id; 
      const role = auth.role;
      const response = await fetch('/api/changePassword', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
          userId,
          password,
          newPassword,
          role,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Error changing password:', data.error);
      } else {
        console.log('Password changed successfully');
        toast.success("Password changed successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/");
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <Container>
      <Section>
        <Row>
          <Label>Name:</Label>
          <Value>{name}</Value>
        </Row>
        <Row>
          <Label>Email:</Label>
          <Value>{email}</Value>
        </Row>
      </Section>
      <Section>
        <h2>Change Password</h2>
        <Input
          type="password"
          placeholder="Current Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <Button onClick={handleChangePassword}>Change Password</Button>
      </Section>
  </Container>
  );
};

export default Settings;
