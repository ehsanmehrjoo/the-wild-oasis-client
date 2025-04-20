"use client";
import { useState } from "react";
import styled from "styled-components";
import Logo from "@/app/_components/Logo";
import Heading from "@/app/_components/Heading";
import Link from "next/link";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 4rem;
  background: linear-gradient(135deg, #141c24, #111827);
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 20%, rgba(162, 177, 192, 0.1), transparent 70%);
    z-index: 0;
  }

  @media (max-width: 768px) {
    grid-template-columns: 90%;
    padding: 2.4rem;
  }
`;

const Box = styled.div`
  background: rgba(20, 28, 36, 0.95);
  padding: 4rem 5rem;
  border-radius: 1.6rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  text-align: center;
  backdrop-filter: blur(10px);
  animation: fadeIn 0.8s ease-out;
  position: relative;
  z-index: 1;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 768px) {
    padding: 3rem 3.5rem;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 500;
  color: #a2b1c0;
  text-decoration: none;
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  background-color: #141c24;
  border: 1px solid #a2b1c0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
    z-index: 0;
  }

  &:hover {
    background-color: #1f2937;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);

    &::after {
      width: 200%;
      height: 200%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  margin-bottom: 1.6rem;
  border-radius: 0.8rem;
  border: 1px solid #334155;
  background-color: #0f172a;
  color: #a2b1c0;
  font-size: 1.4rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 1.2rem;
  border-radius: 0.8rem;
  background-color: #1e293b;
  color: #a2b1c0;
  font-size: 1.6rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #334155;
  }
`;

function Login() {
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("admin123");
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@test.com" && password === "admin123") {
      setIsValid(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <LoginLayout>
      <Box>
        <Logo />
        <Heading
          as="h4"
          style={{
            marginTop: "2.4rem",
            marginBottom: "2rem",
            color: "#a2b1c0",
            fontWeight: 600,
            fontSize: "1.8rem",
            letterSpacing: "0.02em",
          }}
        >
          Log in to your admin account
        </Heading>

        {!isValid ? (
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Login</Button>
          </form>
        ) : (
          <StyledLink href="https://thewildoasis-1.netlify.app">
            Go to Login Page
          </StyledLink>
        )}
      </Box>
    </LoginLayout>
  );
}

export default Login;
