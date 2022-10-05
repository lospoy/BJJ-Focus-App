// POSITION SERVICE

const API_URL = process.env.VUE_APP_ROOT_API
// import { getAuthHeader } from './userService';

export async function getAllPositions() {
    let user = JSON.parse(localStorage.getItem("user"))

    try {
      const response = await fetch(API_URL + '/techniques/positions', {
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

// GET HUMAN BY ID
export async function getPosition(id) {
    let user = JSON.parse(localStorage.getItem("user"))

    try {
      const response = await fetch(API_URL + '/techniques/positions/' + id, {
        method: "GET",
        headers: { "Authorization": "Bearer " + user.token }
      });

    if (!response.ok) {
      throw new Error("error => response not ok");
    } else {
        return await response.json()
    }
  } catch (e) {
    console.log(e);
    this.setState({
      isError: true,
      errorMessage: e.message,
    });
  }
}

export async function createPosition(data) {
    let user = JSON.parse(localStorage.getItem("user"))

    try {
      const response = await fetch(API_URL + '/techniques/positions', {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + user.token },
        body: JSON.stringify(data),
      });

    if (!response.ok) {
      throw new Error("error => response not ok");
    } else {
      return await response;
    }
  } catch (e) {
    console.log(e);
    this.setState({
      isError: true,
      errorMessage: e.message,
    });
  }
}


