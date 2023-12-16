import type { Request, Response } from 'express';

export const getEvents = async (req: Request, res: Response) => {
  const { match } = req.body;
  const events = (await Services.events.getEvents(match)) || [];

  res.status(200).send(events.map(({ _id, ...rest }) => ({ id: _id, ...rest })));
};

export const updateEvent = async (req: Request, res: Response) => {
  const { data } = req.body;
  const { id, ...dataUpdate } = data;
  const updated = await Services.events.updateEvents(id, dataUpdate);
  if (updated) {
    res.status(200).send('ok');
  } else {
    res.status(500).send('Lỗi cập nhật');
  }
};
