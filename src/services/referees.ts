import { Db, WithId } from 'mongodb';
import Service from 'services';

export type Referee = {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
};

export class RefereesService extends Service<Referee> {
  constructor(db: Db) {
    super(db, 'referees');
  }

  getReferees = (id: string): Promise<WithId<Referee> | null> =>
    this.collection.findOne({ _id: id });

  updateReferees = async (id: string, information: Partial<Referee>): Promise<boolean> => {
    const updated = await this.collection.updateOne(
      { _id: id },
      { $set: information },
      { upsert: true }
    );
    return updated.modifiedCount > 0 || updated.upsertedCount > 0;
  };
}
