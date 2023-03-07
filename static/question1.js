let editor = monaco.editor.create(document.getElementById("container"), {
  value: ["function x() {", '\tconsole.log("Nevinn is not okay");', "}"].join(
    "\n"
  ),
  language: "javascript",
});

let editor2 = monaco.editor.create(
  document.getElementById("output-container"),
  {
    value: ['\tconsole.log("Nevinn is not okay");'].join("\n"),
    language: "javascript",
  }
);
