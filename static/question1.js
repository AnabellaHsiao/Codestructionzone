var editor = monaco.editor.create(document.getElementById("container"), {
  value: ["function x() {", '\tconsole.log("Nevinn is not okay");', "}"].join(
    "\n"
  ),
  language: "javascript",
});
