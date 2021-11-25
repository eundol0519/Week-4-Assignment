import React from 'react';
import nullCardImg from './NullCardImg.png'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { loadDictionaryFB, deleteDictionaryFB, completionDictionaryFB } from './redux/modules/dictionary'

import Button from "@material-ui/core/Button";

const List = (props) => {

    let dictionary_list = useSelector((state) => state.dictionary);
    let userInfo;
    let msg = props.msg

    let dispatch = useDispatch();
    let history = useHistory();

    if (msg === 'all') {
        // 모든 단어 출력
        userInfo = dictionary_list.list
    } else if (msg === 'completion') {
        // 외운 단어만 출력
        userInfo = dictionary_list.list.filter((item)=>{
            return item.memory
        })
    }else if (msg === 'unCompletion'){
        // 안외운 단어만 출력
        userInfo = dictionary_list.list.filter((item) => {
            return !item.memory
        })
    }


    const deleteBtn = (index) => {
        if (window.confirm("삭제 하시겠습니까?")) {
            dispatch(deleteDictionaryFB(userInfo[index].id))
        }
    }

    const completionBtn = (index) => {

        const idDate = userInfo[index].id;
        const wordData = userInfo[index].word;
        const exmplationData = userInfo[index].explanation;
        const exampleData = userInfo[index].example;

        dispatch(completionDictionaryFB({ id: idDate, word: wordData, explanation: exmplationData, example: exampleData, memory: true }))
        history.push("/");
    }

    React.useEffect(() => {
        dispatch(loadDictionaryFB());
    }, [userInfo])

    return (
        <Container>
            {
                (userInfo.length != 0)
                    ?
                    userInfo.map((item, index) => {
                        return (
                            <Card key={index}
                                style={item.memory ? { backgroundColor: "white" } : { backgroundColor: "white" }}
                            >
                                <SubTitle>[Word]</SubTitle>
                                <Text>{item.word}</Text>
                                <SubTitle>[Explanation]</SubTitle>
                                <Text>{item.explanation}</Text>
                                <SubTitle>[Example]</SubTitle>
                                <Text>{item.example}</Text>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button size="medium" 
                                        style={ item.memory ? { display:'none' } : { color: "#FFD700", marginRight: "1%", fontWeight : 'bold' }}
                                        onClick={() => { completionBtn(index) }}>완료</Button>
                                    <Button size="medium" style={{ color: "#FA8072", marginRight: "1%", fontWeight : 'bold' }}
                                        onClick={() => { deleteBtn(index) }}>삭제</Button>
                                    <Button size="medium" style={{ color: "#4682B4", fontWeight : 'bold' }}
                                        onClick={() => { history.push({ pathname: "/updateWord", state: { index: index, word: item.word, explanation: item.explanation, example: item.example, memory: item.memory } }) }}>수정</Button>
                                </div>
                            </Card>
                        );
                    })
                    :
                    <NullCard>
                        <img src={nullCardImg}></img>
                        <div>
                            아직 아무도<br />
                            작성하지 않았어요!😄
                        </div>
                    </NullCard>
            }
        </Container>
    );
}

// styled-components

const Container = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 500px;
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

export default List