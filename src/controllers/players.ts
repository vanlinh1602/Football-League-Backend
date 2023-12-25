import type { Request, Response } from 'express';

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
  const { data } = req.body;
  const { id, ...dataUpdate } = data;
  const updated = await Services.players.updatePlayer(id, dataUpdate);

  if (updated) {
    res.status(200).send('ok');
  } else {
    res.status(500).send('Lỗi cập nhật');
  }
};
