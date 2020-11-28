import Axios from "axios";

export const storeNewShipping = async (data) => {
    return await Axios.post('http://127.0.0.1:8000/api/shipping/store', data)
    .then((res) => {
      return res.data;
    });
}