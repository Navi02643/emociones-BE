function filterUser(user) {
  const userData = {
    id: user._id,
    fullName: `${user.name} ${user.middleName} ${user.lastName}`,
    email: user.email,
    phone: user.phone,
    birthdate: user.birthdate,
    maritalStatus: user.maritalStatus,
    range: user.range,
    status: user.status,
  };
  return userData;
}

module.exports = { filterUser };
