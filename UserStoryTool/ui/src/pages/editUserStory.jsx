import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';


import {
  Button,FormSelect
} from "shards-react";


export class EditUserStory extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          isAdded : false,
          data: {},
          Priority : {},
          value : {},
          value_story : {},
          user_stories : {},
          fetchedUserStories :{},
          user_id: sessionStorage.getItem('user_id')
        }
        if(props.location.aboutStories != undefined)
        {
        console.log(props.location.aboutStories['userstory_id']);
        localStorage.setItem("userstory_id",props.location.aboutStories['userstory_id']);
      }
  }

  handleChange = e => {
    this.state.Priority = e.target.value
   };

   componentDidMount() {

     const options =
           {
           url: "http://localhost:5000/users/MaxUserstories",
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
         };

     if(this.state.user_id != "null")
     axios(options)
             .then((response) => {
               this.setState({user_stories : response.data[0][0]});
               console.log(this.state.user_stories);
             });


   const options_userStories =
         {
         url: "http://localhost:5000/users/fetchUserStory",
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         data: {
           UserStoryID: localStorage.getItem('userstory_id')
         }
       };
   if(this.state.user_id != "null")
   axios(options_userStories)
           .then((response) => {
             this.setState({data : response.data[0]});
           });
   }

   logout()
   {
   sessionStorage.setItem("user_id",null);
   }


editUserStory(e) {
    e.preventDefault();
    console.log(this.state.value);
    console.log(document.querySelector("input[name=Priority]").value)
    const options =
    {
    url: "http://localhost:5000/users/edituserprojectstories",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      userstory_name: document.querySelector("input[name=userstory_name]").value,
      Desc_As: document.querySelector("input[name=Desc_As]").value,
      Desc_I: document.querySelector("input[name=Desc_I]").value,
      Desc_So: document.querySelector("input[name=Desc_So]").value,
      etc:document.querySelector("input[name=etc]").value,
      subStories:document.querySelector("input[name=subStories]").value,
      userstory_priority:this.state.Priority,
      UserStoryID:localStorage.getItem('userstory_id'),
      userstory_id:localStorage.getItem('userstory_id'),
    }
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
          if (response.status === 200)
           {
             this.setState({isAdded: true});
               alert(response.data);
           }
           console.log(this.state.isAdded);
           })
           .catch(function(error) {
             console.log(error.response);
                     alert(error.response);

             });
  }


render()
{

console.log(localStorage.getItem("userstory_id"))

  const cssoptions = {
    border: "1px solid #e5e5e5",
    padding: "10px"
};
  const  cssselect = {
        fontsize: "14px",
        border: "none",
        width: "100%",
        background: "white"
    };

   const {isAdded } = this.state

    let fetchedUserStories = this.state.fetchedUserStories
    console.log(fetchedUserStories);


  return (
    <div className="base-container" ref={this.props.containerRef}>
    <br/><br/><br/><br/>
      <div className="header">Edit User Story </div>
    <form onSubmit = {(e) => this.editUserStory(e)}>
      <div className="content">

    <div className="form">

    <div className="form-group">
      <label htmlFor="userstory_name">UserStory Name: </label>
      <input type="text" name="userstory_name" placeholder={this.state.data['userstory_name']} />
    </div>
      <div className="form-group">
        <label htmlFor="Desc_As">Description - As:</label>
        <input type="text" name="Desc_As" placeholder={this.state.data['Desc_As']}  />
      </div>
  <div className="form-group">
        <label htmlFor="Desc_I">Description - I:</label>
        <input type="text" name="Desc_I" placeholder={this.state.data['Desc_I']}  />
      </div>
      <div className="form-group">
        <label htmlFor="Desc_So">Description - So:</label>
        <input type="text" name="Desc_So" placeholder={this.state.data['Desc_So']}  />
      </div>
  <div className="form-group">
    <label htmlFor="ETC" style = {{fontSize : "16px" }}>Estimated Time of Completion:</label>
    <input type="number" step="0.01" name="etc" placeholder={this.state.data['etc']} />
  </div>
  <div className="form-group">
    <label htmlFor="# of SubStories" style = {{fontSize : "16px" }}># of SubStories:</label>
    <input type="number" name="subStories" placeholder={this.state.data['subStories']}  />
  </div>

  <div className="form-group">
          <label htmlFor="Priority" >Priority</label>
        </div>
    <br/>
            <div className="radio-buttons">

                <input type="radio" name="Priority" value="low" onChange={this.handleChange}/>
                <label>
                  Low &nbsp;&nbsp;
                </label>

                  <input type="radio" name="Priority" value="medium" onChange={this.handleChange}/>
                  <label>
                  Medium &nbsp;&nbsp;
                </label>

                <input type="radio" name="Priority" value="high" onChange={this.handleChange}/>
                <label>
                High &nbsp;&nbsp;
                </label>
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
