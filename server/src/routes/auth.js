import express from 'express';
import { login, logout, register } from '../controllers/authController.js';

const app = express.Router();

app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout)

export default app;