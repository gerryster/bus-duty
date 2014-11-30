/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var Navbar = React.createClass({
  propTypes: {
    identifier: React.PropTypes.string.isRequired,
    numkids:    React.PropTypes.number
  },
  render() {
    return (
      <div className="container">
      </div>
    );
  }
});

module.exports = Navbar;
