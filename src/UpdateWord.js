import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components'
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateDictionaryFB } from './redux/modules/dictionary'
// → 패키지 import

import Button from '@mui/material/Button';
// → 머테리얼 UI import

// ** 자식 컴포넌트 (UpdateWord)
const UpdateWord = ({ location }) => {

  let wordRef = useRef(''); // 단어
  let explanationRef = useRef(''); // 설명
  let exampleRef = useRef('') // 예시
  // input의 value를 가져온다.

  const wordCard = useRef();
  const explanationCard = useRef();
  const exampleCard = useRef();
  // Card의 border를 변경 시키기 위해서 사용

  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = useSelector((state) => state.dictionary);
  // redux 데이터 불러오기
  const index = location.state.index
  // 글 수정 시 해당 글의 index를 저장하는 변수

  // 수정 기능 함수
  const updateInfo = () => {

    const wordInfo = wordRef.current.value;
    const explanationInfo = explanationRef.current.value;
    const exampleInfo = exampleRef.current.value;
    // input의 value를 가져온다.

    // 안적은 부분이 있다면 border style을 변경해서 글을 작성 하도록 한다.
    if (wordInfo === "") {
      wordCard.current.style.outline = 'none';
      wordCard.current.style.border = '3px solid #483D8B';
      explanationCard.current.style.border = '1px solid white';
      exampleCard.current.style.border = '1px solid white';
    } else if (explanationInfo === "") {
      explanationCard.current.style.outline = 'none';
      wordCard.current.style.border = '1px solid white';
      explanationCard.current.style.border = '3px solid #483D8B';
      exampleCard.current.style.border = '1px solid white';
    } else if (exampleInfo === "") {
      exampleCard.current.style.outline = 'none';
      wordCard.current.style.border = '1px solid white';
      explanationCard.current.style.border = '1px solid white';
      exampleCard.current.style.border = '3px solid #483D8B';
    } else {
      dispatch(updateDictionaryFB({ id: userInfo.list[index].id, word: wordInfo, explanation: explanationInfo, example: exampleInfo, memory: location.state.memory }))
      history.push("/");
    }
  }

  return (
    <Flex>
      <Wrap>
        <Title>Edir Words</Title>
        <Card ref={wordCard}>
          <SubTitle>Word</SubTitle>
          <Input ref={wordRef} type="text" defaultValue={location.state.word} />
        </Card>
        <Card ref={explanationCard}>
          <SubTitle>Explanation</SubTitle>
          <Input ref={explanationRef} type="text" defaultValue={location.state.explanation} />
        </Card>
        <Card ref={exampleCard}>
          <SubTitle>Example</SubTitle>
          <Input ref={exampleRef} type="text" defaultValue={location.state.example} />
          {/* 기본값 설정 할 때 onClick 함수를 사용하는 경우 value가 아니라 defaultValue를 사용 해야 한다고 오류가 떴다. */}
        </Card>

        <BtnList style={{ justifyContent: 'center' }}>
          <Button variant="contained" style={{ marginRight: '1%', width: '120px', height: '50px' }} onClick={updateInfo}><BtnText>수정</BtnText></Button>
          <Button variant="contained" style={{ marginLeft: '1%', width: '120px', height: '50px' }} onClick={() => { history.goBack() }}><BtnText>목록</BtnText></Button>
        </BtnList>
      </Wrap>
    </Flex>
  );
}

// styled-components
const InInput = keyframes`
  from{
    width: 90%;
    height: 60%;
    outline: none;
  }

  to{
    width: 95%;
    height: 65%;
    outline: none;
  }
`

const Flex = styled.div`
  margin: auto;
  display: flex;
`

const Wrap = styled.div`
  width: 520px;
  margin-top : 9%;
  margin-bottom : 1%;
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

const Card = styled.div`
  background-color: white;
  border: 1px solid white;
  border-radius : 5px;
  width: 420px;
  height: 130px;
  margin :auto;
  padding-left: 5%;
  padding-bottom: 2%;
  text-align : left;
  margin-bottom : 2%;
  font-size: 15px;
`

const Input = styled.input`
  width: 90%;
  height: 60%;
  margin-bottom : 20px;
    
  &:focus{
    animation : ${InInput} 0.55s;
  }
`

const SubTitle = styled.p`
  font-weight: bold;
  font-size: 12px;
`

const BtnList = styled.div`
  display: flex;
`

const BtnText = styled.div`
  padding-top: 12px;
  color : white;
  font-size: 20px;
`

export default UpdateWord;