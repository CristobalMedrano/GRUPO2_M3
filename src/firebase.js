// eslint-disable-next-line
import firebase from 'firebase';
// eslint-disable-next-line
const firebaseConfig = {
  // eslint-disable-next-line
    "type": "service_account",
  // eslint-disable-next-line
    "project_id": process.env.REACT_APP_PROJECT_ID,
  // eslint-disable-next-line
    "private_key_id": process.env.REACT_APP_PRIVATE_KEY_ID,
  // eslint-disable-next-line
    "private_key": process.env.REACT_APP_PRIVATE_KEY,
  // eslint-disable-next-line
    "client_email": process.env.REACT_APP_CLIENT_EMAIL,
  // eslint-disable-next-line
    "client_id": process.env.REACT_APP_CLIENT_ID,
  // eslint-disable-next-line
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  // eslint-disable-next-line
    "token_uri": "https://oauth2.googleapis.com/token",
  // eslint-disable-next-line
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  // eslint-disable-next-line
    "client_x509_cert_url": process.env.REACT_APP_CLIENT_X509_CERT_URL,
  // eslint-disable-next-line
    "storageBucket": "gs://tingeso-file-upload.appspot.com/"
};
// eslint-disable-next-line
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line
var storage = firebase.storage();
// eslint-disable-next-line
export default storage;