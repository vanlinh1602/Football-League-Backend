import type { Request, Response } from 'express';

export const getUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await Services.users.getUser(email);

  res.send(user);
};
