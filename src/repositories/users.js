import db from "../config/db.js";


export const getUsersFromDb = async () => {
  const [users] = await db.query("SELECT * FROM users");
  return users;
};

export const getUserByIdFromDb = async (id) => {
  const [user] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return user.length > 0 ? user[0] : null;
};

export const createUserInDb = async (FirstName, LastName, Email, Password) => {
  const [result] = await db.query(
    "INSERT INTO users (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)",
    [FirstName, LastName, Email, Password]
  );
  return result.insertId;
};

export const updateUserInDb = async (
  id,
  FirstName,
  LastName,
  Email,
  Password
) => {
  const [result] = await db.query(
    "UPDATE users SET FirstName = ?, LastName = ?, Email = ?, Password = ? WHERE id = ?",
    [FirstName, LastName, Email, Password, id]
  );
  return result.affectedRows > 0;
};
export const deleteUserFromDb = async (id) => {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows > 0;
};


export const validateUserByEmailAndPasswordFromDb = async (Email) => {
  const [user] = await db.query("SELECT * FROM users WHERE Email = ?", [Email]);
  return user.length > 0 ? user[0] : null;
};