import { Db, WithId } from 'mongodb';
import Service from 'services';

export type Teams = {
  _id: string;
  name: string;
  logo: string;
  coach: string;
  captain: string;
};

export class TeamsService extends Service<Teams> {
  constructor(db: Db) {
    super(db, 'teams');
  }

  getTeams = (id: string): Promise<WithId<Teams> | null> => this.collection.findOne({ _id: id });

  updateTeams = async (uid: string, information: Partial<Teams>): Promise<boolean> => {
    const updated = await this.collection.updateOne(
      { _id: uid },
      { $set: information },
      { upsert: true }
    );
    return updated.modifiedCount > 0 || updated.upsertedCount > 0;
  };
}
