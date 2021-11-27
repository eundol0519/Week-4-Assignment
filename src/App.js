import './App.css';
import AddWord from './AddWord';
import UpdateWord from './UpdateWord';
import Spinner from './Spinner';
import List from './List'

import Button from '@mui/material/Button';

import React, { useState, dispatch } from 'react';
import { Route, useHistory } from 'react-router-dom'
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux'

function App() {

  let dictionary_list = useSelector((state) => state.dictionary);
  let is_loaded = dictionary_list.is_loaded
  let history = useHistory();

  const [msg, msg변경] = useState("all");

  return (
    <Flex>
      <Route path="/" exact>
        <Wrap className="App">
          <div style={{display:"flex"}}>
            <Title style={{marginRight: '10%'}}>My Dictionary</Title>
            <Button style={{color:'white', fontWeight: 'bold', marginTop: '10px'}} onClick={() => msg변경("all")}>모든 단어</Button>
            <Button style={{color:'white', fontWeight: 'bold', marginTop: '10px'}} onClick={() => msg변경("completion")}>외운 단어</Button>
            <Button style={{color:'white', fontWeight: 'bold', marginTop: '10px'}} onClick={() => msg변경("unCompletion")}>안 외운 단어</Button>
          </div>
          <List msg={msg}></List>
        </Wrap>
        <AddBtn className="addBtn" onClick={() => { history.push("/addWord") }}><AddBtnText>+</AddBtnText></AddBtn>
      </Route>

      {
        !is_loaded && <Spinner></Spinner>
      }
      <Route path="/addWord" component={AddWord}></Route>
      <Route path="/updateWord" component={UpdateWord}></Route>
    </Flex >
  );
}

// styled-components
const InSpin = keyframes`
  from{
    transform : rotate(0deg);
  }
  
  to{
    transform : rotate(360deg);
  }
`

const OutSpin = keyframes`
  from{
    transform : rotate(360deg)
  }

  to{
    transform : rotate(0deg);
  }
`

const Flex = styled.div`
  display: flex;
  position: relative;
`

const Wrap = styled.div`
  width: 530px;
  margin: auto;
  margin-top : 3%;
  margin-bottom : 5%;
  background-color: #6495ED;
  height: 590px;

  border-radius: 10px;
`

const Title = styled.h3`
  text-align : left;
  margin-left: 10%;
  padding-top : 5px;
  color:white;
`

const AddBtn = styled.div`
  border-radius: 100px;
  width: 80px;
  height: 80px;
  color: white;
  background-color: #1E90FF	;

  right: 35%;
  bottom: 13%;
  position: absolute;
  
  // 커서 올라갔을 때 모양 변하게
  cursor: pointer;

  &:hover{
    animation: ${InSpin} 2s;
  }

  &:not(:hover){
    animation: ${OutSpin} 2s;
  }
`

const AddBtnText = styled.div`
  text-align : center;
  padding-top: 12px;
  
  // 두께
  font-weight: bolder;
  // 넓이
  font-size: 40px;
`

export default App;
