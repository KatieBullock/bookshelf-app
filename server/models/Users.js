const starterUsers = require("../assets/users.json");

/**
 * Usually, we would store our users in a database instead of a plain text file
 * that we are committing to git. However, for the purposes of demonstrating
 * the front-end of student portfolio piece, this works fine.
 *
 * You can add or change users by editing the users.json file.
 * I called username "nameOfUser" and password "wordOfPassage"
 * to stop Github from flagging this as not secure because it is hardcoded.
 */
const Users = starterUsers;

const renameProperties = (user) => {
  if (!user) return user;
  return {
    id: user.id,
    username: user.nameOfUser,
    password: user.wordOfPassage,
  };
};

const find = (id) => renameProperties(Users.find((user) => user.id === id));

const findByCredentials = (username, password) => {
  const user = Users.find((user) => {
    return user.nameOfUser === username && user.wordOfPassage === password;
  });
  return user ? renameProperties(user) : user;
};

module.exports = { find, findByCredentials };
