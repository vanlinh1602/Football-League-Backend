import type { Request, Response } from 'express';

export const getMatches = async (req: Request, res: Response) => {
  const { league } = req.body;
  const rawMatches = (await Services.matches.getMatches(league)) || [];

  res.status(200).send(rawMatches.map(({ _id, ...rest }) => ({ id: _id, ...rest })));
};

export const updateMatch = async (req: Request, res: Response) => {
  const { data } = req.body;
  const { id, ...dataUpdate } = data;
  const updated = await Services.matches.updateMatch(id, dataUpdate);
  if (updated) {
    res.status(200).send('ok');
  } else {
    res.status(500).send('Lỗi cập nhật');
  }
};
