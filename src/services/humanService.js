const API_URL = "http://localhost:5000/api";
// import { getAuthHeader } from './userService';

export async function getAllHumans() {
    // ideally should be code below, but importing authHeader() doesn't work?
    // only works when the header is written directly into the function

    // try {
    //   const response = await fetch(API_URL + '/humans', {
    //     method: "GET",
    //     headers: getAuthHeader()
    //   });

    // this one works
    let user = JSON.parse(localStorage.getItem("user"))

    try {
      const response = await fetch(API_URL + '/humans', {
        method: "GET",
        headers: { "Authorization": "Bearer " + user.token }
      });

    if (!response.ok) {
      throw new Error("error => response not ok");
    } else {
      return await response.json();
    }
  } catch (e) {
    console.log(e);
    this.setState({
      isError: true,
      errorMessage: e.message,
    });
  }
}