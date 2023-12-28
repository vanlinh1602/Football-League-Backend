import { Db, WithId } from 'mongodb';
import Service from 'services';

export type Commnet = {
  _id: string;
  path: string;
  user: string;
  content: string;
  avatar: string;
};

export class CommentsService extends Service<Commnet> {
  constructor(db: Db) {
    super(db, 'comments');
  }

  getComments = (path: string): Promise<WithId<Commnet>[]> =>
    this.collection.find({ path }).toArray();

  addComment = async (information: Partial<Commnet>): Promise<boolean> => {
    const updated = await this.collection.insertOne(information as Commnet);
    return updated.insertedId !== null;
  };
}
