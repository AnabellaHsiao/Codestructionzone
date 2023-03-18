import Axios from "axios";

const compile =  (userCode) => {
  return Axios.post(`http://localhost:8000/compiler`, {
    code: userCode,
  }).then((res) => {
    console.log(res);
    return res;
  });
};

const Signup = (data) => {
  return Axios.post(`http://localhost:8000/users/signup`, {
   data:data,
  }).then((res) => {
    console.log(res);
    return res;
  });
};

const ApiService = {
  compile,
  Signup
};

export default ApiService;