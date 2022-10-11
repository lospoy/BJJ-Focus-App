const API_URL = process.env.VUE_APP_ROOT_API + '/users'

export async function createUser(data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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

export async function getAuthHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { "Authorization": "Bearer " + user.token };
  } else {
    return {};
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
      const user = await response.json()
      localStorage.setItem("user", JSON.stringify(user));
      return user
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

// Get user object
export async function getLoggedUser() {
    let user = JSON.parse(localStorage.getItem("user"))

    try {
      const response = await fetch(API_URL + '/me', {
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
