// This is the entry point for the web page.
// ALL CODE must be executed/invoked from here.
// NO CODE should execute on its own, outside of this module.
// PLEASE DO NOT ADD ANY JQUERY IN THIS MODULE.
// IN FACT, keep the jquery to a minimum. Only use jquery on modules
// that currently already use it unless you *REALLY* have to.

/**
localStorage dictionary

currentUserInfo : Object that looks like this:
{
  "userid": integer,
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "phone": "string",
  "isadmin": true,
  "password": "string"
}


**/

var CURRENT_USER_INFO_KEY = "currentUserInfo";
var TEMP_INFO_KEY = "tempInfo";
var TEMP_ERROR_KEY = "tempError";

window.onload = function() {
  main();
};

function main() {

  if (!isLoggedIn()) {
    loginNamespace.showAndSetLoginButtonClickEvents();
    return;
  }
  handleLoggedInUser();
}

function handleLoggedInUser() {
  navNamespace.showNavigationBar();
  navNamespace.setClickListeners();
  bookNamespace.setClickListeners();
  userNamespace.setProfileValues();
  userNamespace.setProfileNotes();
}

function getCurrentUserInfo() {
  var info = localStorage.getItem(CURRENT_USER_INFO_KEY);
  if (!info) {
    return info;
  }
  try {
    return JSON.parse(info);
  } catch (e) {
    return null;
  }
}

function getUserId(){
  return getCurrentUserInfo().userid;

}

function isLoggedIn() {
  var user = getCurrentUserInfo();
  return getCurrentUserInfo() != null && getCurrentUserInfo().userid > 0;
}
