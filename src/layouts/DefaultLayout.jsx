/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Link = require('../components/Link.jsx');
var Navbar = require('../components/Navbar.jsx');

var DefaultLayout = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    breadcrumb: React.PropTypes.component
  },
  getDefaultProps() {
    return {
      title: 'Bus Duty',
    };
  },
  render() {
    var header = (
      <div className="container">
        <h2>{this.props.title}</h2>
        {this.props.breadcrumb}
      </div>
    );

    return (
      <div>
        <Navbar />
        {header}
        {this.props.children}
        <div className="navbar-footer">
          <div className="container">
            <p className="text-muted">
              <span><Link to="/">Home</Link></span>
              <span><Link to="/privacy">Privacy</Link></span>
            </p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DefaultLayout;
