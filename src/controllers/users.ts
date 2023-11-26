import type { Request, Response } from 'express';

export const auth = async (req: Request, res: Response) => {
  const { uid, name, email } = req.body;
  let role = 'guest';
  const user = await Services.users.getUser(uid);
  if (user) {
    role = user.role;
  } else {
    await Services.users.updateUser(uid, { name, email, role });
  }
  res.send({ role });
};
