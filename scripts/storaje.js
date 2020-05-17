var storage = firebase.storage();

const uploadFile = (path, name, file, metadata, callBack) => {
  let ref = storage.ref().child(path+'/'+name);
  ref.put(file, metadata).then(snap => {
    snap.ref.getDownloadURL().then( downloadURL  => {
      callBack(downloadURL);
    });
  });
}
