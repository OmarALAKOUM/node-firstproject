import {
  getAllUsers,
  getUserById,
  createUserService,
  updateUserService,
  deleteUserService,
  loginUserService,
} from "../services/users.js";
import { verifyTokenExpiry } from "../uilities/tokenService.js";
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
};

export const getUser = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user." });
  }
};

export const getProfile = async (req, res) => {
  let user = req.user;
  // let token = req.headers['Authorization'];/* second method */
 console.log('old user',user)
//  const result = await verifyTokenExpiry(token) /* second method */
  try {
    user = await getUserById(user.userId);
    // user = await getUserById(result.userId);/* second method */
    console.log("Fetched user:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user." });
  }
};

export const createUser = async (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;
  console.log("Request Body:", req.body);
  try {
    const newUserId = await createUserService(
      FirstName,
      LastName,
      Email,
      Password
    );
    res.status(201).json({
      status: "Success",
      id: newUserId,
    });
  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { FirstName, LastName, Email, Password } = req.body;

  if (!FirstName || !LastName || !Email || !Password) {
    return res.status(400).json({
      status: "Error",
      message: "FirstName, LastName, Email, and Password are required",
    });
  }

  try {
    const updated = await updateUserService(
      id,
      FirstName,
      LastName,
      Email,
      Password
    );

    if (!updated) {
      return res
        .status(400)
        .json({ status: "Error", message: "User not found" });
    }
    res
      .status(200)
      .json({ status: "Success", message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await deleteUserService(id);

    if (!deleted) {
      return res
        .status(400)
        .json({ status: "Error", message: "User could not be deleted" });
    }

    res
      .status(200)
      .json({ status: "Success", message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return res
      .status(400)
      .json({ status: "Error", message: "Email and password are required." });
  }

  try {
    const result = await loginUserService(Email, Password);

    if (!result) {
      return res
        .status(401)
        .json({ status: "Error", message: "Invalid email or password." });
    }

    res.status(200).json({
      status: "Success",
      token: result.token,
      user: {
        ID: result.user.ID,
        Email: result.user.Email,
        FirstName: result.user.FirstName,
        LastName: result.user.LastName,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
  }
};

export const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    return res
      .status(403)
      .json({ status: "Error", message: "Access denied. No token provided." });
  }
  try {
    const result = await verifyTokenExpiry(token);
    console.log(result);
    if (result.isExpired) {
      return res.status(401).json({ status: "Error", message: result.message });
    }
    req.user = result.decoded;
    console.log(token);
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ status: "Error", message: "Invalid or expired token." });
  }
};
