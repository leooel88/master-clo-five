import { Request, Response } from 'express';
import { getAllUsers, createUser, getUserById, getUserByUsername as serviceGetUserByUsername, updateUser, deleteUser as serviceDeleteUser } from '../../database/services/user.service';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env

export async function getUsers(req: Request, res: Response): Promise<void> {
  console.log("Microservice : User : GET ALL USERS")
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUser(req: Request, res: Response): Promise<void> {
  console.log("Microservice : User : GET USER BY ID")
  const userId = Number(req.params.id);

  try {
    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({ error: 'User introuvable' });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUserByUsername(req: Request, res: Response): Promise<void> {
  console.log("Microservice : User : GET USER BY USERNAME")
  const username = req.params.username;

  try {
    const user = await serviceGetUserByUsername(username);

    if (!user) {
      res.status(404).json({ error: 'User introuvable' });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function postUser(req: Request, res: Response): Promise<void> {
  console.log("Microservice : User : POST USER")
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function putUser(req: Request, res: Response): Promise<void> {
  console.log("Microservice : User : UPDATE USER")
  
  const userId = Number(req.params.id);
  const userData = req.body;

  try {
    const updatedUser = await updateUser(userId, userData);

    if (!updatedUser) {
      res.status(404).json({ error: 'User introuvable' });
      return;
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  console.log("Microservice : User : DELETE USER")
  
  const userId = Number(req.params.id);

  try {
    await serviceDeleteUser(userId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function authenticateUser(req: Request, res: Response): Promise<Response> {
  console.log("Microservice : User : LOGIN USER")
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  const user = await serviceGetUserByUsername(username);

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return res.status(200).json({ token });
}