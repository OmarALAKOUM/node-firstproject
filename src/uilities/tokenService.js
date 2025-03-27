import jwt from "jsonwebtoken";
export const generateToken = async (userId) => {
  try {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return token;
  } catch (error) {
    console.log("error in generate token ", error);
  }
};

export const verifyTokenExpiry = async (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId; 
      return { isExpired: false, decoded ,userId}; 
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return { isExpired: true, message: 'Token has expired.' };
      }
      return { isExpired: true, message: 'Invalid token.' }; 
    }
  };