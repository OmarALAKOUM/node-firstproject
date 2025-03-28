import express from "express";
import users from "./src/routes/users.js";
import cors from 'cors'

const app = express();
const port = process.env.port || 4000;

// app.use(cors({origin:'http://localhost:5173'})); // Url frontend
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(users);
app.listen(port, () => {
  console.log(`Server is running at http://:${port}`);
});

// app.get('/api/users', async (req, res) => {
//   try {
//     const [users] = await db.query('SELECT * FROM users');
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: 'An error occurred while fetching users.' });
//   }
// });

// app.get('/api/users/:id', async (req, res) => {
//     try {
//       const id = Number(req.params.id);
//       const [user] = await connection.query('SELECT * FROM users WHERE id = ?', id);
//       if (user.length === 0) {
//          res.status(404).json({ error: 'User not found.' });
//       }
//       res.json(user);
//     } catch (error) {
//       res.status(500).json({ error: 'An error occurred while fetching the user.' });
//     }
//   });

//   app.post('/api/users', async (req, res) => {

//     const { FirstName,LastName, Email ,Password} = req.body;
//     try {
//       const [result] = await connection.query(
//         'INSERT INTO users (FirstName,LastName, Email,Password) VALUES (?, ?,?,?)',
//         [FirstName, LastName,Email,Password]
//       );
//       const newUserId = result.insertId;
//       res.status(201).json({
//         status: "Success",
//         id: newUserId
//       });
//     } catch (error) {
//       res.status(500).json({ status: "Error", message: error.message });
//     }
//   });

//   app.put('/api/users/:id', async (req, res) => {
//     const  id  = req.params.id;
//     const { FirstName, LastName, Email, Password } = req.body;

//     if (!FirstName || !LastName || !Email || !Password) {
//       return res.status(400).json({ status: "Error", message: "FirstName, LastName, Email, and Password are required" });
//     }

//     try {

//       const [result] = await connection.query(
//         'UPDATE users SET FirstName = ?, LastName = ?, Email = ?, Password = ? WHERE id = ?',
//         [FirstName, LastName, Email, Password, id]
//       );
//       if (result.affectedRows === 0) {
//         return res.status(400).json({ status: "Error", message: "No changes made" });
//       }
//       res.status(200).json({ status: "Success", message: "User updated successfully" });
//     } catch (error) {
//       res.status(500).json({ status: "Error", message: error.message });
//     }
//   });

//   app.delete('/api/users/:id', async (req, res) => {
//     const id = req.params.id;
//     try {

//       const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);

//       if (result.affectedRows === 0) {
//          res.status(400).json({ status: "Error", message: "User could not be deleted" });
//       }
//       res.status(200).json({ status: "Success", message: "User deleted successfully" });
//     } catch (error) {

//       res.status(500).json({ status: "Error", message: error.message });
//     }
//   });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
