import React from "react";
import loginImg from "./login.png";
import axios from "axios";
import { Redirect } from "react-router";

export class Register extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          isRegistered : false,
          role: {}
        }
  }

   handleChange = e => {
     this.state.role = e.target.value
    };


   registration(e) {
     e.preventDefault();
     axios
       .post("http://localhost:5000/users/register", {
         first_name: document.querySelector("input[name=Firstname]").value,
         last_name: document.querySelector("input[name=Lastname]").value,
         user_role: this.state.role,
         email_id: document.querySelector("input[name=email]").value,
         user_id: document.querySelector("input[name=userid]").value,
         password: document.querySelector("input[name=password]").value,
         Project_ID :document.querySelector("input[name=project_id]").value
       })
       .then((response) => {
         console.log(response.data.message);
           if (response.status === 200)
            {
              this.setState({isRegistered: true});
                alert(response.data.message);
            }
            console.log(this.state.isRegistered);
            })
            .catch(function(error) {

              console.log(error.response);
                      alert(error.response.data.message);

              });
   }

  render() {

    const {isRegistered } = this.state

    return (
      <div className="base-container" ref={this.props.containerRef}>
      <br/><br/><br/><br/>
        <div className="header">Register</div>
      <form onSubmit = {(e) => this.registration(e)}>
        <div className="content">
          {/*<div className="image">
           <img src={registerImg} style={myimg}/>
        </div>*/}
          <div className="form">
          <div className="form-group">
            <label htmlFor="userid">User ID</label>
            <input type="text" name="userid" placeholder="userid" />
          </div>
            <div className="form-group">
              <label htmlFor="firstname">Firstname</label>
              <input type="text" name="Firstname" placeholder="Firstname" />
            </div>
			<div className="form-group">
              <label htmlFor="lastname">Lastname</label>
              <input type="text" name="Lastname" placeholder="Lastname" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="password" />
              </div>
              <div className="form-group">
                <label htmlFor="project_id">Project ID</label>
                <input type="text" name="project_id" placeholder="Project ID" />
                </div>


			<div className="form-group">
              <label htmlFor="role" >Role</label>
            </div>
<br/>
            <div className="radio-buttons">

                <input type="radio" name="role" value="developer" onChange={this.handleChange}/>
                <label>
                  Developer &nbsp;
                </label>

                  <input type="radio" name="role" value="manager" onChange={this.handleChange}/>
                  <label>
                  Manager
                </label>

              </div>
<br/>

          </div>
        </div>

        <div className="footer">
        <button type="submit" className="btn">
          Register
        </button>
        </div>
          </form>

          {isRegistered && (
                  <Redirect to={"/"}/>
                )}

      </div>


    );
  }
}
