import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../context/ContextProvider";

const Gemini = (props) => {
  const { input, setInput, onSent, loading, queryAndResponse, resultData } = useContext(Context);

  const handleAskGemini = async () => {
    await onSent(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAskGemini();
    }
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
            placeholder="Ask Your Job and Profile Related Queries!"
            onKeyDown={handleKeyDown} 
          />
          <button onClick={handleAskGemini}>Ask Gemini</button>
        </QuerySection>
        <ResponseSection>
          {loading ? (
            <Loader>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <rect fill="#0073b1" stroke="#0073b1" strokeWidth="15" width="30" height="30" x="25" y="85">
                  <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
                </rect>
                <rect fill="#0073b1" stroke="#0073b1" strokeWidth="15" width="30" height="30" x="85" y="85">
                  <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
                </rect>
                <rect fill="#0073b1" stroke="#0073b1" strokeWidth="15" width="30" height="30" x="145" y="85">
                  <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
                </rect>
              </svg>
            </Loader>
          ) : (
            <>
              {queryAndResponse.query && (
                <Heading>You asked: {queryAndResponse.query}</Heading>
              )}
              {queryAndResponse.response && (
                <>
                  <Heading>Response:</Heading>
                  <p dangerouslySetInnerHTML={{ __html: resultData }} />
                </>
              )}
            </>
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
  padding: 15px; 
  border: none;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 rgb(0, 0, 0, 0.20);
`;

const QuerySection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  img {
    width: 60px; 
    border-radius: 50%;
    margin-right: 12px; 
  }

  input {
    flex-grow: 1;
    border-radius: 35px;
    padding: 12px 20px; 
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-right: 12px; 
    font-size: 16px;  
  }

  button {
    outline: none;
    color: white;
    background-color: #0073b1;
    border: none;
    padding: 12px 24px; 
    border-radius: 35px;
    font-size: 16px;  
    cursor: pointer;

    &:hover {
      background-color: #005582;
    }
  }
`;

const ResponseSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  padding-left: 20px;
  padding-right: 20px;
  background: #fff;
  border-radius: 8px;
  font-size: 18px;  
  line-height: 1.5;
  color: #333;

  p {
    margin: 0;
    background: linear-gradient(90deg, rgba(0, 115, 177, 1) 0%, rgba(175, 66, 97, 1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    overflow-wrap: break-word;
  }
`;

const Heading = styled.h3`
  margin: 0;
  padding-bottom: 8px;
  color: #0073b1;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px; 
  color: #0073b1;

  svg {
    width: 60px; 
    height: 60px; 
  }
`;

export default Gemini;
