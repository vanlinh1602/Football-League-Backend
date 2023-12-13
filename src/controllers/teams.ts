import type { Request, Response } from 'express';

export const getTeams = async (req: Request, res: Response) => {
  const { year } = req.body;

  const rawTeams = (await Services.teams.getTeams(year)) || [];
  const teams = rawTeams.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

  res.status(200).send(teams);
};

export const updateTeam = async (req: Request, res: Response) => {
  const { team } = req.body;
  const { id, ...dataUpdate } = team;
  const updated = await Services.teams.updateTeam(id, dataUpdate);
  if (updated) {
    res.status(200).send('ok');
  } else {
    res.status(500).send('Lỗi cập nhật');
  }
};
