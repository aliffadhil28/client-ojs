import axios from "axios";
import { redirect } from "react-router-dom";

export const loaderGet = async (url) => {
  try {
    let data = await axios
      .get(url, {
        withCredentials: true,
      })
    return data.data;
  } catch (error) {
    if (error.response.status == 401) {
      return redirect("/login");
    }
  }
};
