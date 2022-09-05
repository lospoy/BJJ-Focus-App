// import axios from 'axios'

const API_URL = 'http://localhost:8000/api/users'

// Create new user
// const createUser = async (userData) => {
//     const response = await axios.post(API_URL, userData)
//     return JSON.stringify(response.data)
// }

// export async function getAllUsers() {

//     const response = await fetch(`${baseURL}/users`);
//     return await response.json();
// }

export async function createUser(data) {

    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
          })

        if(!response.ok) {
            throw new Error('error => response not ok')
        } else {
            return await response.json();
        }
    } catch (e) {
        console.log(e);
        this.setState({
              isError: true,
              errorMessage: e.message
        });
    }
}

// const userService = {
//     createUser
// }

// export default userService