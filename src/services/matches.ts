import { Db, WithId } from 'mongodb';
import Service from 'services';

export type Match = {
  _id: string;
  paticipants: string[];
  date: number;
  round: string;
  mathResult: string;
  league: string;
};

export class MatchesService extends Service<Match> {
  constructor(db: Db) {
    super(db, 'matches');
  }

  getMatches = (id: string): Promise<WithId<Match> | null> => this.collection.findOne({ _id: id });

  updateMatches = async (id: string, information: Partial<Match>): Promise<boolean> => {
    const updated = await this.collection.updateOne(
      { _id: id },
      { $set: information },
      { upsert: true }
    );
    return updated.modifiedCount > 0 || updated.upsertedCount > 0;
  };
}
