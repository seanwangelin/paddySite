// grab our db client connection to use with our adapters
const client = require('../client');

async function getAllUsers() {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM users;
      `
    );

    return rows;
  } catch (err) {
    throw err
  }
}

async function createUser({
  username,
  password,
  isAdmin
}) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, isAdmin)
      VALUES ($1,$2, $3)
      ON CONFLICT (username) DO NOTHING
      returning *;
      `,
      [
        username,
        password,
        isAdmin
      ]
    );

    return user;

  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try{
    const { rows } = await client.query(`
      SELECT * FROM users WHERE username=$1;
      `, [username]);
      const [user] = rows;

      return user;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUserByUsername
};
