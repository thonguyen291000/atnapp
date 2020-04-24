const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            console.log("Login success")
            return {
                ...state,
                authError: null
            }
        case "LOGIN_ERROR":
            console.log("Login error")
            return {
                ...state,
                authError: "Login failed"
            }
        case "SIGNOUT_SUCCESS":
            console.log("Signout success")
            return state
        case "SIGNUP_SUCCESS":
            console.log("Signup success")
            return {
                ...state,
                authError: null
            }
        case "SIGNUP_ERROR":
            console.log("Signup error")
            return {
                ...state,
                authError: action.err.message
            }
        case "UPDATE_USER":
            return {
                ...state,
                authError: "Update successfully"
            };
        case "UPDATE_USER_FAILED": 
            return {
                ...state,
                authError: "Update failed"
            } 
        default: 
            return state
    }
}

export default authReducer