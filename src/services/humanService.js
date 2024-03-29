const API_URL = process.env.VUE_APP_ROOT_API
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
    let user = JSON.parse(localStorage.getItem("BJJFocusUser"))

    try {
      const response = await fetch(API_URL + '/humans', {
        method: "GET",
        headers: { "Authorization": "Bearer " + user.token }
      });

    if (!response.ok) {
      throw new Error("error => response not ok");    } else {
      return await response.json();
    }
  } catch (e) {
    console.log(e);

  }
}

// GET HUMAN BY ID
export async function getHuman(id) {
    let user = JSON.parse(localStorage.getItem("BJJFocusUser"))

    try {
      const response = await fetch(API_URL + '/humans/' + id, {
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

  }
}

export async function createHuman(data) {
    let user = JSON.parse(localStorage.getItem("BJJFocusUser"))

    try {
      const response = await fetch(API_URL + '/humans', {
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

  }
}


