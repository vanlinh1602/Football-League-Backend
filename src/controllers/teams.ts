import type { Request, Response } from 'express';
import { uploadBase64Image } from 'server/firebase';

export const getTeams = async (req: Request, res: Response) => {
  const rawTeams = (await Services.teams.getTeams()) || [];
  const teams = rawTeams.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

  res.status(200).send(teams);
};

export const updateTeam = async (req: Request, res: Response) => {
  const { data } = req.body;
  const { id, background, logo, ...dataUpdate } = data;
  const logoUpload = await uploadBase64Image(logo, `teams/${id}/logo.png`);
  const backgroundUpload = await uploadBase64Image(background, `teams/${id}/background.png`);

  const updated = await Services.teams.updateTeam(id, {
    ...dataUpdate,
    logo: logoUpload,
    background: backgroundUpload,
  });

  if (updated) {
    res.status(200).send('ok');
  } else {
    res.status(500).send('Lỗi cập nhật');
  }
};
