import type { Request, Response } from 'express';

export const getComments = async (req: Request, res: Response) => {
  const { path } = req.body;
  const comments = (await Services.comments.getComments(path)) || [];

  res.status(200).send(comments.map(({ _id, ...rest }) => ({ id: _id, ...rest })));
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const updated = await Services.comments.addComment(data);
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send(error);
  }
};
