import { Db, WithId } from 'mongodb';
import Service from 'services';

export type Events = {
  _id: string;
  match: string;
  player: string;
  card?: string;
  scored: boolean;
  time: number;
};

export class EventsService extends Service<Events> {
  constructor(db: Db) {
    super(db, 'events');
  }

  getEvents = (id: string): Promise<WithId<Events> | null> => this.collection.findOne({ _id: id });

  updateEvents = async (id: string, information: Partial<Events>): Promise<boolean> => {
    const updated = await this.collection.updateOne(
      { _id: id },
      { $set: information },
      { upsert: true }
    );
    return updated.modifiedCount > 0 || updated.upsertedCount > 0;
  };
}
