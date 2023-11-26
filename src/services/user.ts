import { Db, WithId } from 'mongodb';
import Service from 'services';

export type User = {
  _id: string;
  email: string;
  name?: string;
  male?: boolean;
  photoURL?: string;
  phoneNumber?: string;
  role: string;
};

export class UsersService extends Service<User> {
  constructor(db: Db) {
    super(db, 'users');
  }

  getUser = (uid: string): Promise<WithId<User> | null> => this.collection.findOne({ _id: uid });

  updateUser = async (uid: string, information: Partial<User>): Promise<boolean> => {
    const updated = await this.collection.updateOne(
      { _id: uid },
      { $set: information },
      { upsert: true }
    );
    return updated.modifiedCount > 0 || updated.upsertedCount > 0;
  };
}
