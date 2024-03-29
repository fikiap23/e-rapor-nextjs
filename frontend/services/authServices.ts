import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const login = async (data: any) => {
  await axios
    .post(`${BASE_URL}/auth/login`, data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
