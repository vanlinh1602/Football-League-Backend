import type { Request, Response } from 'express';
import { uploadBase64Image } from 'server/firebase';

export const getLeagues = async (req: Request, res: Response) => {
  const rawTeams = (await Services.leagues.getLeagues()) || [];
  const teams = rawTeams.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

  res.status(200).send(teams);
};

export const updateLeague = async (req: Request, res: Response) => {
  const { data } = req.body;
  const { id, image, ...dataUpdate } = data;
  const imageUpload = await uploadBase64Image(image, `leagues/${id}/image.png`);
  const updated = await Services.leagues.updateLeague(id, { ...dataUpdate, image: imageUpload });
  if (updated) {
    res.status(200).send('ok');
  } else {
    res.status(500).send('Lỗi cập nhật');
  }
};
