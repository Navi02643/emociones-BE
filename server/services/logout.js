const logoutDB = require('../database/logout');

async function logout(session, refreshToken) {
  const data = { id: session.id, refreshToken };
  const sessionFind = await logoutDB.deleteSession(data);
  if (sessionFind) return 'Closed session';
  return 'The session does not exist';
}

module.exports = { logout };
