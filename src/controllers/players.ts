import type { Request, Response } from 'express';
import { uploadBase64Image } from 'server/firebase';

export const getAllPlayers = async (req: Request, res: Response) => {
  const raw = (await Services.players.getAllPlayers()) || [];
  const players = raw.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

  res.status(200).send(players);
};

export const getPlayers = async (req: Request, res: Response) => {
  const { team } = req.body;
  const raw = (await Services.players.getPlayers(team)) || [];
  const players = raw.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

  res.status(200).send(players);
};

export const updatePlayer = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const { id, avatar, ...dataUpdate } = data;
    const uploadFile = await uploadBase64Image(avatar, `players/${id}/avatar.png`);

    await Services.players.updatePlayer(id, { ...dataUpdate, avatar: uploadFile });
    res.status(200).send('ok');
  } catch (error) {
    res.status(500).send(error);
  }
};
