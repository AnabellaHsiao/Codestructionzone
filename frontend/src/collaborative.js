import React from "react";
import { useState, useRef } from "react";
import "./App.css";
import Editor from "@monaco-editor/react";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Axios from "axios";
import spinner from "./dancing.gif";
import ApiService from "./Components/ApiService";
import * as Y from "yjs";
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';

function Collaborative() {
    // State variable to set users source code
    const [userCode, setUserCode] = useState(``);

    // State variable to set editors default language
    const [userLang, setUserLang] = useState("javaScript");

    // State variable to set editors default theme
    const [userTheme, setUserTheme] = useState("vs-dark");

    // State variable to set editors default font size
    const [fontSize, setFontSize] = useState(20);

    // State variable to set users input
    const [userInput, setUserInput] = useState("");

    // State variable to set users output
    const [userOutput, setUserOutput] = useState("");
    const [result, setResult] = useState("");

    // Loading state variable to show spinner
    // while fetching data
    const [loading, setLoading] = useState(false);
    const [isToggled, setToggle] = useState(false);
    const [allowNext, setAllowNext] = useState(false);

    const editorRef = useRef(null);

    const options = {
        fontSize: fontSize,
    };

    function changeResult(S) {
        if (S.trim() === "Hello Codestruction") {
            setResult("Amazing!");
            // document.getElementById("next").classList.remove("hidden");
            setAllowNext(true);
        } else {
            setResult("Try Again!");
        }
    }
    // Function to clear the output screen
    function clearOutput() {
        setUserOutput("");
    }

    function handleEditorDidMount(editor, monaco){
        editorRef.current = editor;
        const doc = new Y.Doc();
        const provider = new WebrtcProvider("monaco", doc);
        const type = doc.getText("monaco");
        const binding = new MonacoBinding(type,
            editorRef.current.getModel(),
            new Set([editorRef.current]),
            provider.awareness);
    }

    // Function to call the compile endpoint
    function compile() {
        setLoading(true);

        if (userCode === ``) {
            return;
        }

        // Post request to compile endpoint
        ApiService.compile(userCode)
            .then(async (res) => {
                await setUserOutput(res.data.stdout);
                await changeResult(res.data.stdout);
            })
            .then(() => {
                setLoading(false);
            });
    }

    return (
        <div>
            {isToggled ? (
                        <div className="App">
                            <Navbar
                                userLang={userLang}
                                setUserLang={setUserLang}
                                userTheme={userTheme}
                                setUserTheme={setUserTheme}
                                fontSize={fontSize}
                                setFontSize={setFontSize}
                            />
                            <div className="main">
                                <div className="left-container">
                                    <Editor
                                        options={options}
                                        height="calc(100vh - 50px)"
                                        width="100%"
                                        theme={userTheme}
                                        language={userLang}
                                        defaultLanguage="javascript"
                                        defaultValue="// Enter your code here"
                                        onChange={(value) => {
                                            setUserCode(value);
                                        }}
                                        onMount = {handleEditorDidMount}
                                    />
                                    <button className="run-btn" onClick={() => compile()}>
                                        Run
                                    </button>
                                </div>
                                <div className="right-container">
                                    <h4>Output:</h4>
                                    {loading ? (
                                        <div className="spinner-box">
                                            <img src={spinner} alt="Loading..." />
                                        </div>
                                    ) : (
                                        <div className="output-box">
                                            <pre>{userOutput}</pre>
                                            <h4>{result}</h4>
                                            <button
                                                onClick={() => {
                                                    clearOutput();
                                                }}
                                                className="clear-btn"
                                            >
                                                Clear
                                            </button>
                                            {allowNext ? (
                                                <button className="next-btn" id="next">
                                                    Next
                                                </button>
                                            ) : null}
                                        </div>
                                    )}
                                </div>
                            </div>
                </div>
            ) : (
                <div>
                    <Login />
                </div>
            )}
        </div>
    );
}

export default Collaborative;
