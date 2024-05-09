import axios from 'axios'
import {useContext} from 'react'
import AuthContext from "../assets/context/AuthContext.jsx";

const jwtInterceptor = axios.create({})

jwtInterceptor.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
        const {user} = useContext(AuthContext)
        const payload = {
            email : user.email,
        }
      if (error.response.status === 500 && error.response.message =="jwt expired") {
        await axios
          .post("http://localhost:5000/auth/refresh-token", payload, {
            withCredentials: true,
          })
          .catch((err) => {
            return Promise.reject(err);
          });
        console.log(error.config);
        return axios(error.config);
      } else {
        return Promise.reject(error);
      }
    }
  );

export default jwtInterceptor;