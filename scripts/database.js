var db = firebase.firestore();

function writeData(path, obj, callback) {
  db.doc(path).set(obj)
  .then( e => callback(true))
  .catch( e => callback(e));
}

function getData(path, callback) {
  db.doc(path).get()
  .then( doc => doc.exists? callback(doc.data()) : callback(null) )
  .catch( err => callback(err));
}