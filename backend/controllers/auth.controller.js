// Logics for each callback controller from auth.routes.js
// To make the file organized in a more clean way

export const signup = (req, res) => {
    res.send("SignupUser");
    console.log("SignupUser");
}

export const login = (req, res) => {
    console.log("LoginUser");
}

export const logout = (req, res) => {
    console.log("LogoutUser");
}