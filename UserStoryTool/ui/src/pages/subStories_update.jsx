import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';


import {
  Button,FormSelect
} from "shards-react";


export class SubStories_update extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          isAdded : false,
          data: {},
          value:{},
          Priority :{},
          project_ID : {},
          user_stories : {},
          user_id: sessionStorage.getItem('user_id')
        }
        if(props.location.aboutSubStories != undefined)
        {
        console.log(props.location.aboutSubStories['substory_id']);
        localStorage.setItem("userstory_id",props.location.aboutSubStories['userstory_id']);
        localStorage.setItem("substory_id",props.location.aboutSubStories['substory_id'])
      }
  }

  handleChange = e => {
    this.state.Priority = e.target.value
   };


   componentDidMount() {

     const options_userStories =
           {
           url: "http://localhost:5000/users/fetchSubUserstories",
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           data: {
             substory_id: localStorage.getItem('substory_id'),
             userstory_id: localStorage.getItem('userstory_id')
           }
         };
     if(this.state.user_id != "null")
     axios(options_userStories)
             .then((response) => {
               this.setState({data : response.data[0]});
               console.log(this.state.data)
             });
     }


   logout()
   {
   sessionStorage.setItem("user_id",null);
   }

  editSubUserStory(e) {

    e.preventDefault();
    const options =
    {
    url: "http://localhost:5000/users/subuserstoriesupdate",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      Desc_As: document.querySelector("input[name=Desc_As]").value,
      Desc_I: document.querySelector("input[name=Desc_I]").value,
      Desc_So: document.querySelector("input[name=Desc_So]").value,
      etc:document.querySelector("input[name=etc]").value,
      subuserstory_name: document.querySelector("input[name=subuserstory_name]").value,
      substory_id:localStorage.getItem('substory_id'),
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
console.log(this.state.data)
  return (

  <div className="base-container" ref={this.props.containerRef}>
  <br/><br/><br/><br/>
    <div className="header">Edit Sub User Story </div>
  <form onSubmit = {(e) => this.editSubUserStory(e)}>
    <div className="content">

  <div className="form">

  <div className="form-group">
    <label htmlFor="subuserstory_name">SubUserStory Name: </label>
    <input type="text" name="subuserstory_name" placeholder={this.state.data['subuserstory_name']} />
  </div>
    <div className="form-group">
      <label htmlFor="Desc_As">Description - As:</label>
      <input type="text" name="Desc_As" placeholder={this.state.data['Desc_As']} />
    </div>
<div className="form-group">
      <label htmlFor="Desc_I">Description - I:</label>
      <input type="text" name="Desc_I" placeholder={this.state.data['Desc_I']} />
    </div>
    <div className="form-group">
      <label htmlFor="Desc_So">Description - So:</label>
      <input type="text" name="Desc_So" placeholder={this.state.data['Desc_So']} />
    </div>
<div className="form-group">
  <label htmlFor="ETC" style = {{fontSize : "16px" }}>Estimated Time of Completion:</label>
  <input type="number" step="0.01" name="etc" placeholder={this.state.data['etc']} />
</div>

            <br/>
                    </div>
                    </div>
                    <div className="footer">
                    <button type="submit" className="btn">
                      Submit
                    </button>
                  <Link to='/selectEditSubStory'><Button>
                      Back
                    </Button></Link>
                    <Link to='/'><Button theme="warning" onClick={() => this.logout()}>Logout</Button></Link>
                    </div>
                      </form>
                  </div>
                );
              }
            }
