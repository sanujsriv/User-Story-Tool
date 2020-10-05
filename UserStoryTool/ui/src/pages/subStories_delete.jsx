import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';


import {
  Button
} from "shards-react";


export class SubStories_delete extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          isDeleted : false
        }
  }

  logout()
  {
  sessionStorage.setItem("user_id",null);
  }

delUserStory(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/deletesubuserstories", {
        substory_id: document.querySelector("input[name=subuserstory_id]").value,
            })
      .then((response) => {
        // console.log(response.data.message);
          if (response.status === 200)
           {
             this.setState({isDeleted: true});
                  alert(response.data);
           }
           console.log(this.state.isDeleted);
           })
           .catch(function(error) {
             console.log(error.response);
             });
  }

render()
{  const {isDeleted } = this.state
  return (
  <div className="base-container" ref={this.props.containerRef}>
  <br/><br/><br/><br/>

  <div className="header">Delete SubUser Story </div>

  <form onSubmit = {(e) => this.delUserStory(e)}>
  <div className="content">
  <div className="form">
  <div className="form-group">
    <label htmlFor="subuserstory_id">SubUserStory ID: </label>
    <input type="text" name="subuserstory_id" placeholder="Sub UserStory ID" />
      </div>
            <br/>
                    </div>
                    </div>
                    <div className="footer">
                    <button type="submit" className="btn">
                      Submit
                    </button>
                  <Link to='/manager_comp'><Button>
                      Back
                    </Button></Link>
                    <Link to='/'><Button theme="warning" onClick={() => this.logout()}>Logout</Button></Link>
                    </div>
                    </form>
                  </div>

                );
              }
            }
