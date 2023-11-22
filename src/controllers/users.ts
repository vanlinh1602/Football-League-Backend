import type { Request, Response } from 'express';

export const getUser = async (req: Request, res: Response) => {
  const user = Services.users.getUser('');
  res.send(user);
};
