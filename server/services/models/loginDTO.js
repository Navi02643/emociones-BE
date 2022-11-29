function loginDTO(user,token) {
    return user = {
        id: user._id, 
        email: user.email, 
        fullName: user.name
            + " " + user.middleName
            + " " + user.lastName,
        token: token.token,
        refreshToken: token.refreshToken
    }

}

module.exports = { loginDTO };