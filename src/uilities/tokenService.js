import jwt from "jsonwebtoken";
export const generateToken = async (userId) => {
  try {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
      expiresIn: "20s",
    });
    return token;
  } catch (error) {
    console.log("error in generate token ", error);
  }
};

export const verifyTokenExpiry = async (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return { isExpired: false, decoded }; 
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return { isExpired: true, message: 'Token has expired.' };
      }
      return { isExpired: true, message: 'Invalid token.' }; 
    }
  };