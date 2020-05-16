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

function getCollectionData(path, callback) {
  db.collection(path).get()
  .then( doc => {
    let docs = [];
    doc.empty || doc.forEach( e => docs.push(e.data()) );
    callback( docs );
  })
  .catch( err => callback(err));
}