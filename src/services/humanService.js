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

export async function loginUser(data) {
  try {
    const response = await fetch(API_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("error => response not ok");
    } else {
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
    }
  } catch (e) {
    console.log(e);
    this.setState({
      isError: true,
      errorMessage: e.message,
    });
  }
}

// Logout user
export async function logoutUser() {
  localStorage.removeItem("user");
}