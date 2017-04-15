// import AV from 'leancloud-storage'
import { AV } from './av-min.js'
import { APP_ID, APP_KEY } from './AVConfig.js'
// in AVConfig.js
/* template
export let APP_ID = 'your_app_id';
export let APP_KEY = 'your_app_key';

*/


AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export let requestLogin = function(username, password) {
  if (!username || !password) {
    return null
  }
  return AV.User.logIn(username, password);
}

export let requestLogout = function() {
  AV.User.logOut();
}

export let isLoggedIn = function() {
  return AV.User.current() ? true : false;
}

export let requestImageUploadFromLocal = function(fileObj) {
  console.log('uploading image');
  let file = new AV.File(fileObj.name, fileObj);
  let acl = new AV.ACL();
  acl.setPublicReadAccess(true);
  acl.setWriteAccess(AV.User.current(), true);
  file.setACL(acl)
  return file;
}


export let requestImageUploadFromStream = function(fileName, fileStream) {
  console.log('uploading image from stream');
  let data = { base64: fileStream };
  let file = new AV.File(fileName, data);
  let acl = new AV.ACL();
  acl.setPublicReadAccess(true);
  acl.setWriteAccess(AV.User.current(), true);
  file.setACL(acl)
  return file
}
