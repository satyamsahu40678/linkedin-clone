import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../context/ContextProvider";

const Gemini = (props) => {
  const { input, setInput, onSent, loading, resultData } = useContext(Context);

  const handleAskGemini = async () => {
    await onSent(input);
  };

  return (
    <Container>
      <AskGemini>
        <QuerySection>
          {props.user && <img src={props.user.photoURL} alt="User" />}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything!"
          />
          <button onClick={handleAskGemini}>Ask Gemini</button>
        </QuerySection>
        <ResponseSection>
          {loading ? (
            <Loader>Loading...</Loader>
          ) : (
            resultData && <p dangerouslySetInnerHTML={{ __html: resultData }} />
          )}
        </ResponseSection>
      </AskGemini>
    </Container>
  );
};

const Container = styled.div`
  grid-area: middle;
`;

const AskGemini = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  padding: 10px;
  border: none;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 rgb(0, 0, 0, 0.20);
`;

const QuerySection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  img {
    width: 48px;
    border-radius: 50%;
    margin-right: 8px;
  }

  input {
    flex-grow: 1;
    border-radius: 35px;
    padding: 8px 16px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-right: 8px;
  }

  button {
    outline: none;
    color: white;
    background-color: #0073b1;
    border: none;
    padding: 8px 16px;
    border-radius: 35px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #005582;
    }
  }
`;

const ResponseSection = styled.div`
  p {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    background: #fff;
    border-radius: 8px;
    font-size: 16px;
    line-height: 1.5;
    background: linear-gradient(90deg, #0073b1, #af4261);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: orange;
    }
  }
`;

const Loader = styled.div`
  font-size: 14px;
  color: #0073b1;
  
`;

export default Gemini;
