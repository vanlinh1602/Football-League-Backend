import { Db, WithId } from 'mongodb';
import Service from 'services';

export type Match = {
  _id: string;
  teamA: string;
  teamB: string;
  date: number;
  round: string;
  video?: string;
  mathResult?: {
    teamA?: number;
    teamB?: number;
  };
  league: string;
  place: string;
};

export class MatchesService extends Service<Match> {
  constructor(db: Db) {
    super(db, 'matches');
  }

  getMatches = (league: string): Promise<WithId<Match>[]> =>
    this.collection.find({ league }).toArray();

  getAllMatches = (): Promise<WithId<Match>[]> => this.collection.find().toArray();

  updateMatch = async (id: string, information: Partial<Match>): Promise<boolean> => {
    const updated = await this.collection.updateOne(
      { _id: id },
      { $set: information },
      { upsert: true }
    );
    return updated.modifiedCount > 0 || updated.upsertedCount > 0;
  };
}
