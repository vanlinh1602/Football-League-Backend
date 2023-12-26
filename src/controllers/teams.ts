import type { Request, Response } from 'express';
import { uploadBase64Image } from 'server/firebase';

export const getTeams = async (req: Request, res: Response) => {
  const rawTeams = (await Services.teams.getTeams()) || [];
  const teams = rawTeams.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

  res.status(200).send(teams);
};

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const { id, background, logo, ...dataUpdate } = data;
    const logoUpload = await uploadBase64Image(logo, `teams/${id}/logo.png`);
    const backgroundUpload = await uploadBase64Image(background, `teams/${id}/background.png`);

    await Services.teams.updateTeam(id, {
      ...dataUpdate,
      logo: logoUpload,
      background: backgroundUpload,
    });

    res.status(200).send('ok');
  } catch (error) {
    res.status(500).send(error);
  }
};
