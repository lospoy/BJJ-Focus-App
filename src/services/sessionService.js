const API_URL = process.env.VUE_APP_ROOT_API

export async function saveSession(data) {
    let user = JSON.parse(localStorage.getItem("BJJFocusUser"))

  try {
    const response = await fetch(API_URL + '/sessions', {
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

export async function getAllSessions() {
    let user = JSON.parse(localStorage.getItem("BJJFocusUser"))

    try {
      const response = await fetch(API_URL + '/sessions', {
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