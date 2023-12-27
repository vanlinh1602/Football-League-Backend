import type { Request, Response } from 'express';

export const getEvents = async (req: Request, res: Response) => {
  const { match } = req.body;
  const events = (await Services.events.getEvents(match)) || [];

  res.status(200).send(events.map(({ _id, ...rest }) => ({ id: _id, ...rest })));
};

export const getAllEvents = async (req: Request, res: Response) => {
  const events = (await Services.events.getAllEvents()) || [];

  res.status(200).send(events.map(({ _id, ...rest }) => ({ id: _id, ...rest })));
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const { id, ...dataUpdate } = data;
    const updated = await Services.events.updateEvents(id, dataUpdate);
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send(error);
  }
};
