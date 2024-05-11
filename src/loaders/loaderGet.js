import axios from "axios";
import { redirect } from "react-router-dom";

export const loaderGet = async (url) => {
  try {
    const token = sessionStorage.getItem('token');
    let data = await axios.get(url, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error(error);
    // if (error.response.status == 401) {
    //   return redirect("/login");
    // }
  }
};
