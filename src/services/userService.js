const API_URL = 'http://localhost:5000/api/users'

export async function createUser(data) {

    try {
        const response = await fetch(API_URL, {
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

export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export async function loginUser(data) {

    try {
        const response = await fetch(API_URL + "/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
          })

        if(!response.ok) {
            throw new Error('error => response not ok')
        } else {
            const user = await response.json()
            localStorage.setItem('user', JSON.stringify(user))
        }

    } catch (e) {
        console.log(e);
        this.setState({
              isError: true,
              errorMessage: e.message
        });
    }
}



// // making HTTP requests here
// import axios from 'axios'

// // Register user
// const registerUser = async (userData) => {
//     const response = await axios.post(API_URL, userData)

//     // axios puts response inside an object called 'data'
//     if(response.data) {
//         // localStorage only accepts strings >> JSON.stringify
//         localStorage.setItem('user', JSON.stringify(response.data))
//     }

//     return response.data
// }

// // Login user
// const loginUser = async (userData) => {
//     const response = await axios.post(API_URL + 'login', userData)

//     // axios puts response inside an object called 'data'
//     if(response.data) {
//         // localStorage only accepts strings >> JSON.stringify
//         localStorage.setItem('user', JSON.stringify(response.data))
//     }

//     return response.data
// }

// // Logout user
// const logout = () => {
//     localStorage.removeItem('user')
// }

// const userService = {
//     registerUser,
//     logout,
//     loginUser,
// }

// export default userService