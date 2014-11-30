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
var authData = fbRef.getAuth();

if (authData) {
  // user authenticated with Firebase
  console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
  // Initialize a router
  var router = new Router(routes).configure({html5history: true}).init();
} else {
  fbRef.authWithOAuthRedirect("google",
    (error) => {
      console.error('unable to Google authenticate user: ', error);
  });
}

AppDispatcher.register((payload) => {

  var action = payload.action;

  if (action.actionType === ActionTypes.SET_CURRENT_ROUTE) {
      router.setRoute(action.route);
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});
