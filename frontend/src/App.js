import React from "react";
import { useState } from "react";
import "./App.css";
import Editor from "@monaco-editor/react";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Axios from "axios";
import spinner from "./dancing.gif";
import ApiService from "./Components/ApiService";

const Levels = ["Exercise 1: Printing",
    "Exercise 2: Arithmetic",
    "Exercise 3: if/else",
    "Exercise 4: for loops",
    "Exercise 5: while loops",
    "Exercise 6: Arrays"];

const LevelDetails = ["Console.log() can be used to print out messages. For example,\n" +
    "console.log(“test”) outputs “test”.",

    "You can engage in simple calculations using JavaScript.\n" +
    "For example: +, -, *, and / are all valid operations in JavaScript.",

    "If and else statements can be used to make decisions.\n" +
    "For example: for the statement:\n" +
    "if(a=1)\n" +
    "    Console.log(“1”)\n" +
    "else\n" +
    "    Console.log(“not 1”)\n" +
    "The code will print “1” if a is equal to 1 and “not 1” otherwise.",

    "For loops can be used for running lines of code multiple times.\n" +
    "For example: for the statement:\n" +
    "for(let i=1; i<=3; i++)\n" +
    "    Console.log(“Codestruction”)\n" +
    "The code will print “Codestruction” 3 times.",

    "While loops work similarly to for loops. However, you need\n" +
    "to increment the loop by yourself\n" +
    "For example: for the statement:\n" +
    "i=1;\n" +
    "while(i<=3) {\n" +
    "    Console.log(“Yes”)\n" +
    "    i = i+1;\n" +
    "}\n" +
    "The code will print “yes” 3 times.",

    "Arrays can be used to store a collection of values of the same type.\n" +
    "For example: A = [1,2,3] is an array with 3 numbers.\n" +
    "You can use indexing to access any values in the array.\n" +
    "Please note: the index of the array is always one lower than the\n" +
    "position of the value.\n" +
    "For example: the value of A[1] is actually 2, not 1."];

const Tasks = ["Task: Print out “Hello Codestruction” using console.log()",
    "Task: You are given x and y. print out x+y and x*y.",
    "Task: You are given x. Using an if/else statement, print out “big” if\n" +
    "x is bigger than 5, and print out “small” if x is smaller than 5.",
    "Task: Using a for loop, print out all numbers from 1 to 10.",
    "Task: Using a while loop, print out “Super Codestruction!” 4 times.",
    "Task: You are given an array of 10 numbers. Using indexing, print out\n" +
    "the second and sixth number on separate lines."];

const Correct = ["Hello Codestruction\n",
    "12\n35\n",
    "big\n",
    "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n",
    "Super Codestruction!\nSuper Codestruction!\nSuper Codestruction!\nSuper Codestruction!\n",
    "6\n7\n"];

const baseState = ["// Enter your code here",
    "// Enter your code here\n x=5;\n x=7;",
    "// Enter your code here\n x=7;",
    "// Enter your code here",
    "// Enter your code here",
    "// Enter your code here\n let A = [27, 6, 37, 12, 16, 7, 12, 18, 35, 30];"];

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
  const [result, setResult] = useState("");

  // Loading state variable to show spinner
  // while fetching data
  const [loading, setLoading] = useState(false);
  const [isToggled, setToggle] = useState(true);
  const [allowNext, setAllowNext] = useState(false);

  const [currentLevel, setLevel] = useState(1);

  const options = {
    fontSize: fontSize,
  };

  function changeResult(S) {
      console.log(S);
      console.log(Correct[currentLevel-1]);
      if (S === Correct[currentLevel-1] && currentLevel !== 6) {
          setResult("Amazing! On to the next Level!");
          setAllowNext(true);
      } else if (S === Correct[currentLevel-1] && currentLevel === 6){
          setResult("Congratulations! You completed all Levels!");
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
        await setUserOutput(res.data.stdout);
        await changeResult(res.data.stdout);
      })
      .then(() => {
        setLoading(false);
      });
  }

  function nextLevel(){
      setLevel(currentLevel+1);
      setAllowNext(false);
      setUserCode("");
      setUserOutput("");
      setResult("");
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
                                      defaultValue={baseState[currentLevel-1]}
                                      onChange={(value) => {
                                          setUserCode(value);
                                      }}
                                  />
                                  <button className="run-btn" onClick={() => compile()}>
                                      Run
                                  </button>
                              </div>
                              <div className="right-container">
                                  <h4>{Levels[currentLevel-1]}</h4>

                                  <h4>
                                      {LevelDetails[currentLevel-1]}
                                  </h4>

                                  <h4>{Tasks[currentLevel-1]}</h4>

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
                                              <button onClick={() => {
                                                  nextLevel();
                                              }} className="next-btn" id="next">
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

export default App;
