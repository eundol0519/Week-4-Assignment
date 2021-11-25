import './App.css';
import nullCardImg from './NullCardImg.png'
import AddWord from './AddWord';
import UpdateWord from './UpdateWord';
import Spinner from './Spinner';

import React from 'react';
import { Route, useHistory } from 'react-router-dom'
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import { deleteDictionaryFB, loadDictionaryFB } from './redux/modules/dictionary'

import Button from "@material-ui/core/Button";

function App() {

  const dispatch = useDispatch();
  let history = useHistory();
  const dictionary_list = useSelector((state) => state.dictionary);
  const userInfo = dictionary_list.list
  const is_loaded = dictionary_list.is_loaded

  const deleteBtn = (index) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      dispatch(deleteDictionaryFB(userInfo[index].id))
    }
  }

  React.useEffect(() => {
    dispatch(loadDictionaryFB());
  }, [userInfo])

  return (
    <Flex>
      <Route path="/" exact>
        <Wrap className="App">
          <Title>My Dictionary</Title>
          <Container>
            {
              (userInfo.length != 0)
                ?
                userInfo.map((item, index) => {
                  return (
                    <Card key={index}>
                      <SubTitle>[Word]</SubTitle>
                      <Text>{item.word}</Text>
                      <SubTitle>[Explanation]</SubTitle>
                      <Text>{item.explanation}</Text>
                      <SubTitle>[Example]</SubTitle>
                      <Text>{item.example}</Text>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="outlined" size="medium" style={{ borderColor: "#FA8072", color: "#FA8072", marginRight: "1%" }}
                          onClick={() => { deleteBtn(index) }}>삭제하기</Button>
                        <Button variant="outlined" size="medium" style={{ borderColor: "#4682B4", color: "#4682B4" }}
                          onClick={() => { history.push({ pathname: "/updateWord", state: { index: index, word: item.word, explanation: item.explanation, example: item.example } }) }}>수정하기</Button>
                      </div>
                    </Card>
                  );
                })
                :
                <NullCard>
                  <img src={nullCardImg}></img>
                  <div>
                    아직 아무도<br />
                    작성하지 않았어요!<br />
                    😄😄😄😄😄😄😄😄😄😄
                  </div>
                </NullCard>
            }
          </Container>
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

const Container = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 500px;
`

const Title = styled.h3`
  text-align : left;
  margin-left: 10%;
  padding-top : 5px;
  color:white;
`

const Card = styled.div`
  background-color: white;
  border: 1px solid white;
  border-radius : 5px;
  width: 400px;
  height: 260px;
  margin:auto;
  padding-left: 5%;
  text-align : left;
  margin-bottom : 5%;
  padding-top : 1%;
  font-size: 15px;
`

const NullCard = styled.div`
  background-color: white;
  border: 1px solid white;
  border-radius : 5px;
  width: 400px;
  height: 270px;
  margin:auto;
  padding-left: 5%;
  text-align : left;
  margin-bottom : 5%;
  font-size: 15px;
  margin-top: 100px;

  display: flex;

  & img {
    margin: 5%;
    margin-left: 0px;
    margin-bottom : 50px;
  }

  & div {
    margin-top: 100px;
  }
`

const SubTitle = styled.p`
  font-size: 12px;
  font-weight: bold;
`

const Text = styled.p`
  word-break:break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
