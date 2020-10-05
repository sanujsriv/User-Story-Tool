import React from "react";
import loginImg from "./login.png";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login=this.login.bind(this);
    this.state = {
      isSignedin: false,
      isDeveloper: false,
      isManager : false
    }
  }
login(e) {
    e.preventDefault();

const options =
        {
        url: "http://localhost:5000/users/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          user_id: document.getElementById('username').value,
          password: document.getElementById('password').value
        }
      };

axios(options)
.then((response) => {
  console.log(response.data.message);
    if (response.status === 200)
       {
         this.setState({ isSignedin: true });

         if(this.state.isSignedin)
              {

              sessionStorage.setItem("user_id",document.getElementById('username').value);
               if(response.data.role === "developer")
              {
              console.log(response.data.role);
               this.setState( {isDeveloper : true });
               console.log(this.state.isDeveloper);
              }
                if(response.data.role === "manager")
                        {
                 console.log(response.data.role);
                 this.setState( {isManager : true });
                 console.log(this.state.isManager);
                        }

            console.log(this.state);
              }
         }
         else {
           this.setState({ isSignedin: false });
         }
       })
.catch(function(error) {
    if(document.getElementById('username').value === '')
    {
      alert("Username field Empty!");
    }
    else if(document.getElementById('password').value === ''){
      alert("Password field Empty!");
    }
    else{ console.log(error.response);
          alert(error.response.data.message);
        }
        });

  }

  render() {
    console.log(sessionStorage.getItem('user_id'));
    const myimg = {
      "border-radius": "30px",
    };

    const { isSignedin, isDeveloper, isManager} = this.state

    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">
          User Story Tool
          <br />
          <br />
        </div>
      <form onSubmit = {(e) => this.login(e)}>
        <div className="content">
          <div className="image">
            <img src={loginImg} style={myimg} />
          </div>
          <br />
          <br />
          <br />
          <div className="header">
            Login
            <br />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="password"
              />
            </div>
          </div>
        </div>
        <div className="footer">
        {/*<a href = './Dev' class ='btn btn-primary' onClick = {(e) => this.login(e)} >Login</a>*/}
          <button
            type="submit"
            //onClick={() => this.changeMessage()}
            className="btn"
          >
            Login
          </button>
          {isSignedin && isDeveloper && (
                       <Redirect to="/user_comp"/>
           )}
           {isSignedin && isManager && (
                   <Redirect to="/manager_comp"/>
                 )}
        </div>


          </form>




      </div>
    );
  }
}
