function loginDTO(user, token) {
  const userData = {
    id: user._id,
    email: user.email,
    fullName: `${user.name} ${user.middleName} ${user.lastName}`,
    token: token.token,
    refreshToken: token.refreshToken,
  };
  return userData;
}

module.exports = { loginDTO };
