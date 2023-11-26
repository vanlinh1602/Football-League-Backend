import { Db, WithId } from 'mongodb';
import Service from 'services';

export type Leagues = {
  _id: string;
  start: number;
  end: number;
  name: string;
  participants: CustomObject<{
    numberMember: number;
    coach: string;
  }>;
};

export class LeaguesService extends Service<Leagues> {
  constructor(db: Db) {
    super(db, 'leagues');
  }

  getLeagues = (id: string): Promise<WithId<Leagues> | null> =>
    this.collection.findOne({ _id: id });

  updateLeagues = async (id: string, information: Partial<Leagues>): Promise<boolean> => {
    const updated = await this.collection.updateOne(
      { _id: id },
      { $set: information },
      { upsert: true }
    );
    return updated.modifiedCount > 0 || updated.upsertedCount > 0;
  };
}
