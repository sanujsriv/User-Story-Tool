import React from 'react';
import { Link } from 'react-router-dom';

export class NotFound extends React.Component
  {
  render() {
      return (
          <div align="center">
          <br/><br/>
          <h1>404</h1><br/>
          <h2>
              <br/><br/>
              Page not found</h2>
              <br/><br/><br/><br/>
              <Link to="/">Go home</Link>
          </div>
            );
          }
  }
