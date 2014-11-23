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
      layout: DefaultLayout,
      buses: [
        { number: 80,
          numKids: 2,
        },
        { number: 82,
          numKids: 5,
        },
        { number: 83,
          numKids: 2,
        },
        { number: 84,
          numKids: 2,
        },
        { number: 85,
          numKids: 2,
        },
      ]
    };
  },
  render() {
    return (
      <div id="content" className="container">
        <div className="row">
          <div className="col-sm-4">
            <ul>
              {this.props.buses.map(function(bus){
                return <li>{bus.number}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
