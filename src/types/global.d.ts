/* eslint-disable vars-on-top, no-var */
import { MongoClient } from 'mongodb';
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
  };
}

declare module 'express-session' {
  interface SessionData {
    user?: any;
  }
}
