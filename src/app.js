/*!
 * Facebook React Starter Kit | https://github.com/kriasoft/react-starter-kit
 * Copyright (c) KriaSoft, LLC. All rights reserved. See LICENSE.txt
 */

'use strict';

var React = require('react');
var copyProperties = require('react/lib/copyProperties');
var {Router} = require('director');
var AppDispatcher = require('./AppDispatcher');
var ActionTypes = require('./constants/ActionTypes');

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

/**
 * Check if Page component has a layout property; and if yes, wrap the page
 * into the specified layout, then mount to document.body.
 */
function render(page) {
  var child, props = {};
  while (page.defaultProps.layout) {
    child = page(props, child);
    copyProperties(props, page.defaultProps);
    page = page.defaultProps.layout;
  }
  React.renderComponent(page(props, child), document.body);
  document.title = props.title;
}

// Define URL routes
// See https://github.com/flatiron/director
var routes = {
  '/': () => render(require('./pages/Index.jsx')),
  '/privacy': () => render(require('./pages/Privacy.jsx'))
};

// init Firebase
window.fbRef = new Firebase('https://blistering-inferno-5872.firebaseio.com/');

// This seems to fix the redirect issue as described here: http://stackoverflow.com/questions/26390027/firebase-authwithoauthredirect-woes
// I suspect that getAuth() is not synchronous in the redirect response.
if (sessionStorage.reload) {
  delete sessionStorage.reload;
  setTimeout(function() {
    location.reload();
  }, 1000)
} else {
  var authData = fbRef.getAuth();

  if (authData) {
    // user authenticated with Firebase
    console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
    // Initialize a router
    var router = new Router(routes).configure({html5history: true}).init();

    // security debugging
    fbRef.child("buses").once('value',
      function(value) {
        console.log(JSON.stringify(value.val()));
      });

    AppDispatcher.register((payload) => {

      var action = payload.action;

      if (action.actionType === ActionTypes.SET_CURRENT_ROUTE) {
          router.setRoute(action.route);
      }

      return true; // No errors.  Needed by promise in Dispatcher.
    });

  } else {
    sessionStorage.reload = true;
    fbRef.authWithOAuthRedirect("google",
      (error) => {
        console.error('unable to Google authenticate user: ', error);
    });
  }
}
