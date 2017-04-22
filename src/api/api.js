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

let Post = AV.Object.extend('Post');
let Category = AV.Object.extend('Category');

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

export let createNewPost = function(title, content = '') {
  let post = new Post();
  let acl = new AV.ACL();
  acl.setPublicReadAccess(true);
  acl.setWriteAccess(AV.User.current(), true);
  post.set('title', title);
  post.set('content', content);
  post.set('owner', AV.User.current())
  post.setACL(acl);
  return post.save();
}


export let getCategories = function() {
  let query = new AV.Query('Category');
  query.equalTo('owner',AV.User.current());
  return query.find();

}

export let addCategory = function(categoryName) {
  let cat = new Category();
  let acl = new AV.ACL();
  acl.setPublicReadAccess(true);
  acl.setWriteAccess(AV.User.current(), true);
  cat.set('owner', AV.User.current())
  cat.set('category', categoryName);
  cat.setACL(acl);

  return cat.save();
}

// addCategory('js')
// addCategory('html')
// addCategory('css')