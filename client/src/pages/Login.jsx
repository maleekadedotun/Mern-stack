import React from 'react';


import styled from "styled-components";
import {mobile} from "../responsive";
import {useState} from "react";
import {login} from "../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";
// import axios from "axios";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error= styled.span`
  color: red;
`



const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector((state) => state.user)

  const handleClick = (e)=>{
    e.preventDefault()
    login(dispatch,{username, password});
  }
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form method="POST">
          <Input placeholder="username" onChange={(e)=> setUserName(e.target.value)} />
          <Input type="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)}  />
          <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
          {error && <Error>Wrong Credentials</Error>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
