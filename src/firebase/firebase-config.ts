import * as admin from 'firebase-admin';

const serviceAccount = require('../firebase/serviceAccount/tpclinicaferrero-firebase-adminsdk-9g3m1-2be414dc76.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
