import Axios from "axios";

const compile = (userCode) => {
  return Axios.post(`http://localhost:8000/compiler`, {
    code: userCode,
  }).then((res) => {
    console.log(res);
    return res;
  });
};

const Signup = (email, password) => {
  return Axios.post(`http://localhost:8000/users/signup`, {
    data: {
      email,
      password,
    },
  }).then((res) => {
    return res;
  });
};

const Signin = (email, password) => {
  return Axios.post(`http://localhost:8000/users/signin`, {
    data: {
      email,
      password,
    },
  }).then((res) => {
    // console.log("Api signin" + res.data.username + "\n");
    return res;
  });
};

const MySession = () => {
  return Axios.get(`http://localhost:8000/users/me`, {}).then((res) => {
    console.log("Api signin" + res + "\n");
    return res;
  });
};

const ApiService = {
  compile,
  Signup,
  Signin,
  MySession,
};

export default ApiService;
