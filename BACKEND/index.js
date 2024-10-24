import express from 'express';
import mongoose, { Schema } from 'mongoose';
import process from 'node:process';
import cors from 'cors';
import connectDB from './connectDatabase.js';
import helmet from 'helmet';

await connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('port', PORT);

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Define User Schema
const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  contact: Number,
  password: String
});

const userOptionSchema = new Schema({
  option: String,
});

// Models
const User = mongoose.model('users', userSchema);
const Option = mongoose.model('input_variable', userOptionSchema);

// GET Users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ allUsers: users });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET Roulette Options
app.get('/rouletteRead', async (req, res) => {
  try {
    const options = await Option.find();
    res.status(200).json({ results: options });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST Create User
app.post('/user', async (req, res) => {
  if (!req.body) return res.status(400).json({ message: "Bad Request - body is required" });
  try {
    const newUser = new User(req.body);
    const insertNewUser = await newUser.save();
    res.status(201).json(insertNewUser);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
});

// POST Create Option for Roulette
app.post('/roulette', async (req, res) => {
  try {
    const newOption = new Option(req.body);
    const insertNewOption = await newOption.save();
    res.status(201).json(insertNewOption);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' });
  }
});

// DELETE User by ID
app.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.status(204).json({ message: "User deleted successfully!" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error deleting the user', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE Roulette Option by ID
app.delete('/roulettes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOption = await Option.findByIdAndDelete(id);
    if (deletedOption) {
      res.status(204).json({ message: "Option deleted successfully!" });
    } else {
      res.status(404).json({ message: "Option not found" });
    }
  } catch (error) {
    console.error('Error deleting the option', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PATCH Update User by ID
app.patch('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUserDetails = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedUserDetails) {
      res.status(201).json(updatedUserDetails);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error updating the user', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PATCH Update Roulette Option by ID
app.patch('/roulettes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOptionDetails = await Option.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedOptionDetails) {
      res.status(201).json(updatedOptionDetails);
    } else {
      res.status(404).json({ message: "Option not found" });
    }
  } catch (error) {
    console.error('Error updating the option', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
