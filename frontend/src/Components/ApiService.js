import Axios from "axios";

const compile = (userCode) => {
  return Axios.post(process.env.REACT_APP_BACKEND_URL + "/compiler", {
    code: userCode,
  }).then((res) => {
    return res;
  });
};

// No use at the moment, but may be used in the future
const callChatBot = (level, details, task, userCode) => {
  return Axios.post(
    process.env.REACT_APP_BACKEND_URL + "/construction-hat-bot",
    {
      level: level,
      details: details,
      task: task,
      userCode: userCode,
    }
  ).then((res) => {
    console.log(res);
    return res;
  });
};

const Signup = (data) => {
  return Axios.post(process.env.REACT_APP_BACKEND_URL + "/users/signup", {
    data: data,
  }).then((res) => {
    return res;
  });
};

const ApiService = {
  compile,
  callChatBot,
  Signup,
};

export default ApiService;
