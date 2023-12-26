import { Storage } from '@google-cloud/storage';
import admin from 'firebase-admin';

const serviceAccountKey = require('../configs/firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  storageBucket: 'gs://league-management-64ba6.appspot.com',
});

export const uploadBase64Image = async (
  base64String: string,
  filePath: string
): Promise<string> => {
  const matches = base64String.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string');
  }

  const mimeType = matches[1];
  const base64 = matches[2];
  const buffer = Buffer.from(base64, 'base64');

  const storage = new Storage({
    projectId: serviceAccountKey.project_id,
    credentials: {
      client_email: serviceAccountKey.client_email,
      private_key: serviceAccountKey.private_key,
    },
  });

  const bucket = storage.bucket(admin.instanceId().app.options.storageBucket!);

  const file = bucket.file(filePath);
  const stream = file.createWriteStream({
    metadata: {
      contentType: mimeType,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', () => {
      file.makePublic().then(() => {
        resolve(`https://storage.googleapis.com/${bucket.name}/${file.name}`);
      });
    });
    stream.end(buffer);
  });
};
