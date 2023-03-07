const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post("/compile", (req, res) => {
  //getting the required data from the request
  let code = req.body.code;
  //   let language = req.body.language;
  let input = req.body.input;

  //   if (language === "python") {
  //     language = "py";
  //   }

  //   let data = {
  //     code: code,
  //     language: language,
  //     input: input,
  //   };
  //   let config = {
  //     method: "post",
  //     url: "https://ce.judge0.com",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };
  //calling the code compilation API

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=false&wait=true",
    headers: {
      "X-RapidAPI-Key": "d54f68f664msh4dcc91fed2cd856p1f9862jsn60ced304edec",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    body: {
      source_code: "console.log('yes');",
      language_id: 63,
    },
  };

  //   Axios(options)
  //     .then((response) => {
  //       res.send(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  console.log("here");
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
