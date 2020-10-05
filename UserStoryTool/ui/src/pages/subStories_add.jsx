import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';


import {
  Button,FormSelect
} from "shards-react";


export class SubStoriesAdd extends React.Component {
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
        if(props.location.aboutStories != undefined)
        {
        console.log(props.location.aboutStories['userstory_id']);
        localStorage.setItem("userstory_id",props.location.aboutStories['userstory_id']);
        localStorage.setItem("devUser_id",props.location.aboutStories['devUser_id'])
      }
  }

  handleChange = e => {
    this.state.Priority = e.target.value
   };


   componentDidMount() {


   const options2 =
         {
         url: "http://localhost:5000/users/fetchProjectUsers",
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         data: {
           user_id: this.state.user_id
         }
       };
   if(this.state.user_id != "null")
   axios(options2)
           .then((response) => {
             this.setState({data : response.data[0][0]['users']});
             this.setState({project_ID : response.data[0][0]['Project_ID']});
           });
   }

   logout()
   {
   sessionStorage.setItem("user_id",null);
   }

  addSubUserStory(e) {

    e.preventDefault();
        axios.post("http://localhost:5000/users/registersubuserstories", {
        userstory_id: localStorage.getItem("userstory_id"),
        user_id: localStorage.getItem("devUser_id"),
        Project_ID :this.state.project_ID,
        Desc_As: document.querySelector("input[name=Desc_As]").value,
        Desc_I: document.querySelector("input[name=Desc_I]").value,
        Desc_So: document.querySelector("input[name=Desc_So]").value,
        etc:document.querySelector("input[name=etc]").value,
        subuserstory_name: document.querySelector("input[name=subuserstory_name]").value,
            })
      .then((response) => {
        console.log(response.data.message);
          if (response.status === 200)
           {
             this.setState({isAdded: true});
               alert(response.data.message);
           }
           console.log(this.state.isAdded);
           })
           .catch(function(error) {

             console.log(error.response);
                     alert(error.response.data);

             });
}
render()
{
  console.log(this.state.value)
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
  console.log()
    let user_dev=this.state.data;
    console.log(user_dev);
    let user_story_dev=[];
    const user_story_devlist = () => {
    for(let i=0;i<user_dev.length;i++)
    {
    if(user_dev[i]["user_id"] != this.state.user_id  && user_dev[i]["user_role"] != 'manager'){
      user_story_dev.push(<option style={cssoptions} name="user_id" value={user_dev[i]["user_id"]}>{user_dev[i]["user_id"]}</option>);
    }

  }
      return user_story_dev;
}

  return (

  <div className="base-container" ref={this.props.containerRef}>
  <br/><br/><br/><br/>
    <div className="header">Add User Story </div>
  <form onSubmit = {(e) => this.addSubUserStory(e)}>
    <div className="content">

  <div className="form">

  <div className="form-group">
    <label htmlFor="subuserstory_name">SubUserStory Name: </label>
    <input type="text" name="subuserstory_name" placeholder="SubUserStory name" />
  </div>
    <div className="form-group">
      <label htmlFor="Desc_As">Description - As:</label>
      <input type="text" name="Desc_As" placeholder="Description As" />
    </div>
<div className="form-group">
      <label htmlFor="Desc_I">Description - I:</label>
      <input type="text" name="Desc_I" placeholder="Description I" />
    </div>
    <div className="form-group">
      <label htmlFor="Desc_So">Description - So:</label>
      <input type="text" name="Desc_So" placeholder="Description So" />
    </div>
<div className="form-group">
  <label htmlFor="ETC" style = {{fontSize : "16px" }}>Estimated Time of Completion:</label>
  <input type="number" step="0.01" name="etc" placeholder="ETC..." />
</div>

            <br/>
                    </div>
                    </div>
                    <div className="footer">
                    <button type="submit" className="btn">
                      Submit
                    </button>
                  <Link to='/manager_comp'><Button>
                      Home
                    </Button></Link>
                    <Link to='/'><Button theme="warning" onClick={() => this.logout()}>Logout</Button></Link>
                    </div>
                      </form>
                  </div>
                );
              }
            }
