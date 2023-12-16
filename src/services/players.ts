import { Db, WithId } from 'mongodb';
import Service from 'services';

export type Player = {
  _id: string;
  name: string;
  avatar: string;
  role: string;
  team: string;
  description?: string;
  birthday?: number;
};

export class PlayersService extends Service<Player> {
  constructor(db: Db) {
    super(db, 'players');
  }

  getPlayer = (id: string): Promise<WithId<Player> | null> => this.collection.findOne({ _id: id });

  getPlayers = (team: string) => this.collection.find({ team }).toArray();

  updatePlayer = async (id: string, information: Partial<Player>): Promise<boolean> => {
    const updated = await this.collection.updateOne(
      { _id: id },
      { $set: information },
      { upsert: true }
    );
    return updated.modifiedCount > 0 || updated.upsertedCount > 0;
  };
}
