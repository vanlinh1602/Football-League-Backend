import { Db, WithId } from 'mongodb';
import Service from 'services';

import { EventsService } from './events';

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
};

export class MatchesService extends Service<Match> {
  eventService;

  constructor(db: Db) {
    super(db, 'matches');
    this.eventService = new EventsService(db);
  }

  getMatches = (league: string): Promise<WithId<Match>[]> =>
    this.collection.find({ league }).toArray();

  updateMatch = async (id: string, information: Partial<Match>): Promise<boolean> => {
    const updated = await this.collection.updateOne(
      { _id: id },
      { $set: information },
      { upsert: true }
    );
    return updated.modifiedCount > 0 || updated.upsertedCount > 0;
  };
}
