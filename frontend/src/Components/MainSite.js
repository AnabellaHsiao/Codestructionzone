import { useAuth0 } from "@auth0/auth0-react";
import React, { useRef } from "react";
import { useState } from "react";
import "./../App.css";
import Editor from "@monaco-editor/react";
import Navbar from "./Navbar";
import ApiService from "./ApiService.js";
import CompilingInteractive from "./CompilingInteractive";
import { compilingScreenSplash, runtimeErrorSplash } from "./Splashes";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";

const Levels = [
  "Exercise 1: Printing",
  "Exercise 2: Arithmetic",
  "Exercise 3: if/else",
  "Exercise 4: for loops",
  "Exercise 5: while loops",
  "Exercise 6: Arrays",
];

const LevelDetails = [
  "Console.log() can be used to print out messages. For example,\n" +
    "console.log(“test”) outputs “test”.",

  "You can engage in simple calculations using JavaScript.\n" +
    "For example: +, -, *, and / are all valid operations in JavaScript.",

  "If and else statements can be used to make decisions.\n" +
    "For example: for the statement:\n" +
    "if(a=1) {\n" +
    "    console.log(“1”)\n" +
    "} else {\n" +
    "    console.log(“not 1”)\n" +
    "}\n" +
    "The code will print “1” if a is equal to 1 and “not 1” otherwise.",

  "For loops can be used for running lines of code multiple times.\n" +
    "For example: for the statement:\n" +
    "for(let i=1; i<=3; i++){\n" +
    "    console.log(“Codestruction”)\n" +
    "}\n" +
    "The code will print “Codestruction” 3 times.",

  "While loops work similarly to for loops. However, you need\n" +
    "to increment the loop by yourself\n" +
    "For example: for the statement:\n" +
    "i=1;\n" +
    "while(i<=3) {\n" +
    "    console.log(“Yes”)\n" +
    "    i = i+1;\n" +
    "}\n" +
    "The code will print “yes” 3 times.",

  "Arrays can be used to store a collection of values of the same type.\n" +
    "For example: A = [1,2,3] is an array with 3 numbers.\n" +
    "You can use indexing to access any values in the array.\n" +
    "Please note: the index of the array is always one lower than the\n" +
    "position of the value.\n" +
    "For example: the value of A[1] is actually 2, not 1.",
];

const Tasks = [
  "Task: Print out “Hello Codestruction” using console.log()",
  "Task: You are given x and y. print out x+y and x*y.",
  "Task: You are given x. Using an if/else statement, print out “big” if\n" +
    "x is bigger than 5, and print out “small” if x is smaller than 5.",
  "Task: Using a for loop, print out all numbers from 1 to 10.",
  "Task: Using a while loop, print out “Super Codestruction!” 4 times.",
  "Task: You are given an array of 10 numbers. Using indexing, print out\n" +
    "the second and sixth number on separate lines.",
];

const Correct = [
  "Hello Codestruction\n",
  "12\n35\n",
  "big\n",
  "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n",
  "Super Codestruction!\nSuper Codestruction!\nSuper Codestruction!\nSuper Codestruction!\n",
  "6\n7\n",
];

const baseState = [
  "// Codestruct your code here!",
  "// Codestruct your code here!\nx=5;\ny=7;",
  "// Codestruct your code here!\nx=7;",
  "// Codestruct your code here!",
  "// Codestruct your code here!",
  "// Codestruct your code here!\nlet A = [27, 6, 37, 12, 16, 7, 12, 18, 35, 30];",
];

const checkup = ["console.log", "x*y", "else", "for", "while", "A[5]"];

const modeTexts = ["Single-player mode", "Versus mode"];

const MainSite = (props) => {
  const { isAuthenticated } = useAuth0();

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
  const [result, setResult] = useState("");
  const [collabtext, setcollabtext] = useState("collab is disabled.");

  // Loading state variable to show spinner
  // while fetching data
  const [loading, setLoading] = useState(false);
  const [chatbotLoading, setChatbotLoading] = useState(false);
  const [allowNext, setAllowNext] = useState(false);

  const [collab, setcollab] = useState(false);

  const editorRef = useRef(null);

  const [currentLevel, setLevel] = useState(1);

  const options = {
    fontSize: fontSize,
  };

  function changeResult(S) {
    if (
      S.toLowerCase() === Correct[currentLevel - 1].toLowerCase() &&
      !userCode.replace(/\s/g, "").includes(checkup[currentLevel - 1])
    ) {
      setResult(
        "Don't try to cheat. Please follow the instructions carefully."
      );
    } else if (
      S.toLowerCase() === Correct[currentLevel - 1].toLowerCase() &&
      currentLevel !== 6
    ) {
      setResult("Amazing! On to the next Level!");
      setAllowNext(true);
    } else if (
      S.toLowerCase() === Correct[currentLevel - 1].toLowerCase() &&
      currentLevel === 6
    ) {
      setResult("Congratulations! You completed all Levels!");
      props.handleLevelUp();
    } else {
      setResult("Try Again!");
    }
  }
  // Function to clear the output screen
  function clearOutput() {
    setUserOutput("");
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
        if (res.data.status.id === 3) {
          await setUserOutput(res.data.stdout);
          await changeResult(res.data.stdout);
        } else {
          await setResult(runtimeErrorSplash() + "\n\n" + res.data.stderr);
        }
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status &&
          err.response.status === 429
        ) {
          setResult(
            "It looks like our construction partner, Judge0, who helps us make sure our code is strong and sturdy, is taking a little break right now. It's like when the construction workers take a break from building to rest their muscles and get ready for more work! But don't worry, soon we'll be back to codestructing (or destroying our code to make it better!) and building amazing things with Judge0 by our side. "
          );
        }
      })
      .then(() => {
        setLoading(false);
      });
  }

  // Function to call ConstructionHatGPT (no use at the moment, but can be used for future purposes)
  function callGPT() {
    setChatbotLoading(true);

    if (userCode === ``) {
      return;
    }

    // Post request to constructionHatGPT endpoint
    ApiService.callChatBot(
      Levels[currentLevel - 1],
      LevelDetails[currentLevel - 1],
      Tasks[currentLevel - 1],
      userCode
    );
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    const doc = new Y.Doc();
    const provider = new WebrtcProvider("monaco", doc);
    const type = doc.getText("monaco");
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );
  }

  function togglecollab() {
    setcollab(!collab);
    if (collab) {
      setcollabtext("collab is enabled.");
    } else {
      setcollabtext("collab is disabled.");
    }
  }

  function nextLevel() {
    setLevel(currentLevel + 1);
    setAllowNext(false);
    setUserCode("");
    setUserOutput("");
    setResult("");
    if (editorRef.current) {
      editorRef.current.setValue(baseState[currentLevel]);
    }
    // Versus
    if (props.mode && props.mode === "1") {
      props.handleLevelUp();
    }
  }

  return (
    isAuthenticated && (
      <div>
        <div className="App">
          <Navbar
            userTheme={userTheme}
            setUserTheme={setUserTheme}
            fontSize={fontSize}
            setFontSize={setFontSize}
            modeText={modeTexts[props.mode]}
            opponentLevel={props.opponentLevel}
            handleLeaveRoom={props.handleLeaveRoom}
            mode={props.mode}
          />
          <div className="main">
            <div className="left-container">
              {!collab ? (
                <Editor
                  options={options}
                  height="calc(100vh - 50px)"
                  width="100%"
                  theme={userTheme}
                  language={userLang}
                  defaultLanguage="javascript"
                  defaultValue={baseState[currentLevel - 1]}
                  onChange={(value) => {
                    setUserCode(value);
                  }}
                  onMount={(editor) => {
                    editorRef.current = editor;
                  }}
                />
              ) : (
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
                  onMount={(editor) => {
                    editorRef.current = editor;
                    handleEditorDidMount();
                  }}
                />
              )}
              <button className="run-btn" onClick={() => compile()}>
                Run
              </button>
            </div>
            <div className="right-container">
              <h4 className="level">{Levels[currentLevel - 1]}</h4>

              <h4>{LevelDetails[currentLevel - 1]}</h4>

              <h4>{Tasks[currentLevel - 1]}</h4>

              <h4>Output:</h4>
              <div style={{ display: loading ? "block" : "none" }}>
                <div className="compiling-loading">
                  {compilingScreenSplash()}
                </div>
                <div className="spinner-box">
                  <CompilingInteractive />
                </div>
              </div>
              {!loading && (
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
                    <button
                      onClick={() => {
                        nextLevel();
                      }}
                      className="next-btn"
                      id="next"
                    >
                      Next
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MainSite;
