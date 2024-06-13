import axios from "axios";
import queryString from "query-string";
import sweetAlert from "utils/sweetAlert";

export const HTTP_CONSTANTS = {
  API_URL: "http://localhost:4004/api/v1.0",
  TEST_API_URL: "https://jsonplaceholder.typicode.com",
  HTTP_HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const axiosClient = axios.create({
  headers: HTTP_CONSTANTS.HTTP_HEADERS,
  baseURL: HTTP_CONSTANTS.API_URL,
});

// To share cookies to cross site domain, change to true.
axiosClient.defaults.withCredentials = false;

export const getRequest = async (URL, query) => {
  try {
    const { data } = await axiosClient.get(
      queryString.stringifyUrl({
        url: `${HTTP_CONSTANTS.API_GATEWAY_URL}${URL}`,
        query,
      })
    );
    return data;
  } catch (error) {
    if (error.name == "AxiosError") {
      throw error.response;
    } else throw error;
  }
};

export const putRequest = async (URL, payload) => {
  try {
    const { data } = await axiosClient.post(URL, payload);
    sweetAlert({
      icon: "success",
      title: data.message,
    });
    return data;
  } catch (error) {
    if (error.name == "AxiosError") {
      sweetAlert({
        icon: "error",
        title: error.response.data,
      });
      throw error.response;
    } else throw error;
  }
};

export const postRequest = async (URL, payload, alert = true) => {
  try {
    const { data } = await axiosClient.post(URL, payload);
    alert &&
      sweetAlert({
        icon: "success",
        title: data.message,
      });
    return data;
  } catch (error) {
    if (error.name == "AxiosError") {
      alert &&
        sweetAlert({
          icon: "error",
          title: error.response.data,
        });
      throw error.response;
    } else throw error;
  }
};

export const patchRequest = async (URL, payload) => {
  try {
    const { data } = await axiosClient.patch(URL, payload);
    sweetAlert({
      icon: "success",
      title: data.message,
    });
    return data;
  } catch (error) {
    if (error.name == "AxiosError") {
      sweetAlert({
        icon: "error",
        title: error.response.data,
      });
      throw error.response;
    } else throw error;
  }
};

export const deleteRequest = async (URL, payload) => {
  try {
    let { data: query = {} } = payload;
    const { data } = await axiosClient.delete(
      queryString.stringifyUrl({
        url: `${HTTP_CONSTANTS.API_URL}${URL}`,
        query,
      })
    );
    sweetAlert({
      icon: "success",
      title: data.message,
    });
    return data;
  } catch (error) {
    if (error.name == "AxiosError") {
      sweetAlert({
        icon: "error",
        title: error.response.data,
      });
      throw error.response;
    } else throw error;
  }
};
