import React, { useState } from "react";
import styled from "styled-components";
import run from "../gemini";

const Gemini = (props) => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskGemini = async () => {
    setLoading(true);
    const result = await run(query);
    setResponse(result);
    setLoading(false);
  };

  return (
    <Container>
      <AskGemini>
        <QuerySection>
          {props.user && <img src={props.user.photoURL} alt="User" />}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything!"
          />
          <button onClick={handleAskGemini}>Ask Gemini</button>
        </QuerySection>
        <ResponseSection>
          {loading ? (
            <Loader>Loading...</Loader>
          ) : (
            response && <p>{response}</p>
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
    padding: 16px;
    background: #f3f2ef;
    border-radius: 8px;
  }
`;

const Loader = styled.div`
  font-size: 14px;
  color: #0073b1;
`;

export default Gemini;
