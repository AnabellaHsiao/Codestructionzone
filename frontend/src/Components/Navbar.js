import React from "react";
import Select from "react-select";
import "./Navbar.css";
import TitleInteractive from "./TitleInteractive";

const Navbar = ({
  userLang,
  setUserLang,
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
}) => {
  const languages = [{ value: "javascript", label: "javascript" }];
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];
  return (
    <div className="navbar">
      <TitleInteractive />
      <Select
        options={themes}
        value={userTheme}
        onChange={(e) => setUserTheme(e.value)}
        placeholder={userTheme}
      />
      <label>Font Size</label>
      <input
        type="range"
        min="18"
        max="30"
        value={fontSize}
        step="2"
        onChange={(e) => {
          setFontSize(e.target.value);
        }}
      />
    </div>
  );
};

export default Navbar;
