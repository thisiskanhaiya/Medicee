export const initialState = "home";

export const reducer = (state, action) => {
    if (action.type === "hospital") {
        return action.payload
    }
    else if (action.type === "home"){
        return action.payload // home
    }
    else if (action.type === "user"){
        return action.payload // user
    }
    else if (action.type === "admin"){
        return action.payload // user
    }
    return state
}