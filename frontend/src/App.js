import React from "react";
import { useState } from "react";
import "./App.css";
import Editor from "@monaco-editor/react";
import Navbar from "./Components/Navbar";
import Axios, {all} from "axios";
import spinner from "./dancing.gif";

function App() {
  // State variable to set users source code
  const [userCode, setUserCode] = useState(``);

  // State variable to set editors default language
  const [userLang, setUserLang] = useState("javaScript");

  // State variable to set editors default theme
  const [userTheme, setUserTheme] = useState("vs-dark");

  // State variable to set editors default font size
  const [fontSize, setFontSize] = useState(20);

  // State variable to set users output
  const [userOutput, setUserOutput] = useState("");

  // Loading state variable to show spinner
  // while fetching data
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");

  const [allowNext, setAllowNext] = useState(false);

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

  // Function to call the compile endpoint
  function compile() {
    setLoading(true);
    if (userCode === ``) {
      return;
    }

    // Post request to compile endpoint
    Axios.post(`http://localhost:8000/compile`, {
      code: userCode,
    })
      .then(async (res) => {
        await setUserOutput(res.data.stdout);
        await changeResult(res.data.stdout);
      })
      .then(() => {
        setLoading(false);
      }).then(() => {
    })
  }

  // Function to clear the output screen
  function clearOutput() {
    setUserOutput("");
  }

  return (
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
            height="calc(100vh - 150px)"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="javascript"
            defaultValue="// Enter your code here"
            onChange={(value) => {
              setUserCode(value);
            }}
          />
          <button className="run-btn" onClick={() => compile()}>
            Run
          </button>
        </div>
        <div className="right-container">
          <h4>Exercise 1: Printing</h4>

          <h4>Console.log() can be used to print out messages.
              For example, console.log(“test”) outputs “test”.</h4>
          <h4>Task: Print out “Hello Codestruction” using console.log()</h4>


          <h4>Output:</h4>
          {loading ? (
            <div className="spinner-box">
              <img className="loading" src={spinner} alt="Loading..." />
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
              {allowNext ?               <button
                  className="next-btn" id = "next"
              >
                Next
              </button> : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
