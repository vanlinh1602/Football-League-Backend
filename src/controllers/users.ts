import type { Request, Response } from 'express';

export const auth = async (req: Request, res: Response) => {
  const { uid, name, email, photoURL } = req.body;
  let role = 'guest';
  const user = await Services.users.getUser(uid);
  if (user) {
    role = user.role;
    res.send(user);
  } else {
    await Services.users.updateUser(uid, { name, email, role, photoURL });
    res.send({ uid, name, email, role });
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  const { path, data, user } = req.body;
  await Services.users.updateUser(user, { [path]: data });
  res.send({});
};
