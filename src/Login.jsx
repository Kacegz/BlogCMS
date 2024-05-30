import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export default function Login() {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  async function submitHandler(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) {
      return setError(data.error);
    }
    if (data.isAdmin) {
      setError("");
      localStorage.setItem("accessToken", JSON.stringify(data));
      return navigate("/dashboard/");
    } else {
      setError("Not an admin");
    }
  }
  return (
    <>
      <Wrapper>
        <StyledForm onSubmit={submitHandler}>
          {error ? <ErrorMsg>{error}</ErrorMsg> : ""}
          <label htmlFor="username">
            <p>Username:</p>
            <StyledInput
              type="text"
              name="username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </label>
          <label htmlFor="password">
            <p>Password:</p>
            <StyledInput
              type="password"
              name="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </label>
          <StyledButton type="submit" value="Login" />
        </StyledForm>
      </Wrapper>
    </>
  );
}
const Wrapper = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  text-align: center;
  padding: 40px;
  font-size: 24px;
`;
const StyledInput = styled.input`
  border: 1px solid #f7ded0;
  background: white;
  border-radius: 10px;
  width: 300px;
  height: 30px;
  font-size: 24px;
  font-weight: bold;
`;
const StyledButton = styled(StyledInput)`
  width: 300px;
  height: 34px;
  border-radius: 10px;
  background: #ead8c0;
  border: 1px solid #a79277;
  &:hover {
    background: #d1bb9e;
    outline: none;
  }
`;
const ErrorMsg = styled.p`
  color: red;
  font-weight: bold;
`;
