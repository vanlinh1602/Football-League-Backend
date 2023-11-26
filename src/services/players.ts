import { Db, WithId } from 'mongodb';
import Service from 'services';

export type Player = {
  _id: string;
  name: string;
  birthday: number;
  address: string;
  phone: string;
  email: string;
  team: string;
};

export class PlayersService extends Service<Player> {
  constructor(db: Db) {
    super(db, 'players');
  }

  getPlayers = (id: string): Promise<WithId<Player> | null> => this.collection.findOne({ _id: id });

  updatePlayers = async (id: string, information: Partial<Player>): Promise<boolean> => {
    const updated = await this.collection.updateOne(
      { _id: id },
      { $set: information },
      { upsert: true }
    );
    return updated.modifiedCount > 0 || updated.upsertedCount > 0;
  };
}
