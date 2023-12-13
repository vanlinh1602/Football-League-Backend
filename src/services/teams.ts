import { Db, ObjectId, WithId } from 'mongodb';
import Service from 'services';

export type Teams = {
  name: string;
  logo: string;
  owner: string;
  year: number;
};

export class TeamsService extends Service<Teams> {
  constructor(db: Db) {
    super(db, 'teams');
  }

  getTeam = (id: string): Promise<WithId<Teams> | null> =>
    this.collection.findOne({ _id: new ObjectId(id) });

  getTeams = (year: number) => this.collection.find({ year }).toArray();

  updateTeam = async (uid: string, information: Partial<Teams>): Promise<boolean> => {
    const updated = await this.collection.updateOne(
      { _id: new ObjectId(uid) },
      { $set: information },
      { upsert: true }
    );
    return updated.modifiedCount > 0 || updated.upsertedCount > 0;
  };
}
