import type { Request, Response } from 'express';

export const getMatches = async (req: Request, res: Response) => {
  const { league } = req.body;
  const rawMatches = (await Services.matches.getMatches(league)) || [];

  res.status(200).send(rawMatches.map(({ _id, ...rest }) => ({ id: _id, ...rest })));
};

export const getAllMatches = async (req: Request, res: Response) => {
  const rawMatches = (await Services.matches.getAllMatches()) || [];

  res.status(200).send(rawMatches.map(({ _id, ...rest }) => ({ id: _id, ...rest })));
};

export const updateMatch = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const { id, ...dataUpdate } = data;
    const updated = await Services.matches.updateMatch(id, dataUpdate);
    if (updated) {
      res.status(200).send('ok');
    } else {
      res.status(200).send('Không có cập nhật');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
