import axios from "axios";
import { redirect } from "react-router-dom";

export const loaderParams = async (url, params) => {
    try {
      let data = await axios.get(url+'/'+params, {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        return redirect('/login')
      }
    }
  };
  