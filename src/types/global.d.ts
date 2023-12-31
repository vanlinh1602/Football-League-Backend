/* eslint-disable vars-on-top, no-var */
import { MongoClient } from 'mongodb';
import type { CommentsService } from 'services/comments';
import type { EventsService } from 'services/events';
import type { LeaguesService } from 'services/leagues';
import type { MatchesService } from 'services/matches';
import type { PlayersService } from 'services/players';
import type { TeamsService } from 'services/teams';
import type { UsersService } from 'services/user';
import type { Logger as LoggerType } from 'winston';

declare global {
  type CustomObject<Type> = {
    [key: string]: Type;
  };
  var ProductID: string;
  var Databases: CustomObject<MongoClient>;
  var Logger: LoggerType;
  var Services: {
    users: UsersService;
    teams: TeamsService;
    players: PlayersService;
    leagues: LeaguesService;
    matches: MatchesService;
    events: EventsService;
    comments: CommentsService;
  };
}

declare module 'express-session' {
  interface SessionData {
    user?: any;
  }
}
