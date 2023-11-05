/* eslint-disable vars-on-top, no-var */
import { app } from 'firebase-admin';

declare global {
  type CustomObject<Type> = {
    [key: string]: Type;
  };
  var Firebase: app.App;
}
