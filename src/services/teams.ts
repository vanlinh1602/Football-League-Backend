import { Db, WithId } from 'mongodb';
import Service from 'services';

export type Teams = {
  _id: string;
  name: string;
  logo: string;
  background: string;
  owner: string;
  coach: string;
  captain: string;
  description: string;
  country: string;
  founding: number;
};

export class TeamsService extends Service<Teams> {
  constructor(db: Db) {
    super(db, 'teams');
  }

  getTeam = (id: string): Promise<WithId<Teams> | null> => this.collection.findOne({ _id: id });

  getTeams = () => this.collection.find().toArray();

  updateTeam = async (id: string, information: Partial<Teams>): Promise<boolean> => {
    const updated = await this.collection.updateOne(
      { _id: id },
      { $set: information },
      { upsert: true }
    );
    return updated.modifiedCount > 0 || updated.upsertedCount > 0;
  };
}
