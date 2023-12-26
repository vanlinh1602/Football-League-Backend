import { Db, WithId } from 'mongodb';
import Service from 'services';

export type Leagues = {
  _id: string;
  name: string;
  image: string;
  start: number;
  end: number;
  participants: string[];
};

export class LeaguesService extends Service<Leagues> {
  constructor(db: Db) {
    super(db, 'leagues');
  }

  getLeagues = (): Promise<WithId<Leagues>[]> => this.collection.find().toArray();

  updateLeague = async (id: string, information: Partial<Leagues>): Promise<boolean> => {
    const updated = await this.collection.updateOne(
      { _id: id },
      { $set: information },
      { upsert: true }
    );
    return updated.modifiedCount > 0 || updated.upsertedCount > 0;
  };
}
