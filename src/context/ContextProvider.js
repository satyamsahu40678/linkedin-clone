import React, { createContext, useState } from "react";
import { run } from "../gemini";

export const Context = createContext();


//defining the context for the prompt to glorify the plain text
const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [queryAndResponse, setQueryAndResponse] = useState({ query: "", response: "" });

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    //new chat state
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData("");
        setQueryAndResponse({ query: "", response: "" });
    };

    const formatResponse = (response) => {
        // Handle headers
        response = response.replace(/##(.*?)##/g, "<h2>$1</h2><br>");

        // Handle bold text
        let responseArray = response.split("**");
        let formattedResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                formattedResponse += responseArray[i];
            } else {
                formattedResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        // Handle italic text
        formattedResponse = formattedResponse.split("*").join("<i>");
        formattedResponse = formattedResponse.split("*/").join("</i>");

        // Handle blockquotes
        formattedResponse = formattedResponse.replace(/```(.*?)```/gs, "<blockquote>$1</blockquote>");

        // Handle code blocks
        formattedResponse = formattedResponse.replace(/`([^`]+)`/g, "<code>$1</code>");

        // Handle lists
        formattedResponse = formattedResponse.replace(/- (.*?)\n/g, "<ul><li>$1</li></ul>");

        // Replace new lines with <br> tags
        formattedResponse = formattedResponse.replace(/\n/g, "<br>");

        // Merge consecutive <ul> tags
        formattedResponse = formattedResponse.replace(/<\/ul><ul>/g, "");

        return formattedResponse;
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts((prev) => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }

        let formattedResponse = formatResponse(response);

        // Store query and response
        setQueryAndResponse({ query: input || prompt, response: formattedResponse });

        // Display the formatted response word by word
        let responseArray = formattedResponse.split(" ");
        for (let i = 0; i < responseArray.length; i++) {
            const nextWord = responseArray[i];
            delayPara(i, nextWord + " ");
        }

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        queryAndResponse
    };

    return (
        <Context.Provider value={contextValue}>{props.children}</Context.Provider>
    );
};

export default ContextProvider;
