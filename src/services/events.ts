import { Db, WithId } from 'mongodb';
import Service from 'services';

export type Events = {
  _id: string;
  match: string;
  name: string;
  detail: {
    team: string;
    player?: string;
  };
};

export class EventsService extends Service<Events> {
  constructor(db: Db) {
    super(db, 'events');
  }

  getEvents = (match: string): Promise<WithId<Events>[]> =>
    this.collection.find({ match }).toArray();

  updateEvents = async (id: string, information: Partial<Events>): Promise<boolean> => {
    const updated = await this.collection.updateOne(
      { _id: id },
      { $set: information },
      { upsert: true }
    );
    return updated.modifiedCount > 0 || updated.upsertedCount > 0;
  };
}
