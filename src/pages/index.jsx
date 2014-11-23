/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/DefaultLayout.jsx');

var HomePage = React.createClass({
  getDefaultProps() {
    return {
      title: 'Bus Duty',
      layout: DefaultLayout
    };
  },
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
          </div>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
