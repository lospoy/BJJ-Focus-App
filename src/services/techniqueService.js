// TECHNIQUE SERVICE

const API_URL = process.env.VUE_APP_ROOT_API
// import { getAuthHeader } from './userService';

export async function getAllTechqniques() {
    let user = JSON.parse(localStorage.getItem("user"))

    try {
      const response = await fetch(API_URL + '/technique', {
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
export async function getTechnique(id) {
    let user = JSON.parse(localStorage.getItem("user"))

    try {
      const response = await fetch(API_URL + '/technique/id/' + id, {
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

// 10/04 @17:23 RESUME HERE
//
//
// creating a new technique means creating a new COMBINATION of POSITION, MOVE, and VARIATION
// position may or may not exist
// move may or may not exist
// variation may or may not exist

// if Technique not found:
// if Position not found => createPosition()
// if Move not found => createMove()
// if Variation not found => createVariation()
// then createTechnique()
export async function createTechnique(data) {
    let user = JSON.parse(localStorage.getItem("user"))

    try {
      const response = await fetch(API_URL + '/technique', {
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


