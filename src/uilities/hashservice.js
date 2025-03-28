import bcrypt from "bcryptjs";

export const handleHashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

export const checkPassword = async (inputPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error verifying password:", error);
  }
};
