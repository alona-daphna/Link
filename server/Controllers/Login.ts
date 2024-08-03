import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;
const jwtSecret = process.env.JWT_SECRET;

export default (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (adminUsername === username && adminPassword === password && jwtSecret) {
    const token = jwt.sign({}, jwtSecret);
    return res.status(200).json(token);
  }

  return res.status(401).json({ message: 'Incorrect username or password' });
};
