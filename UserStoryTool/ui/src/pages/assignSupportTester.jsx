import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';


import {
  Button,FormSelect
} from "shards-react";


export class AssignSupportTester extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          isAdded : false,
          data: {},
          project_ID : {},
          user_stories : {},
          user_id: sessionStorage.getItem('user_id')
        }
          this.goBack = this.goBack.bind(this);
        if(props.location.aboutUserStoryDoneBy != undefined)
        {
        console.log(props.location.aboutUserStoryDoneBy['']);
        localStorage.setItem("userStoryID",props.location.aboutUserStoryDoneBy['userStoryID']);
        localStorage.setItem("userID",props.location.aboutUserStoryDoneBy['userID']);
      }
  }


  goBack(){
      this.props.history.goBack();
  }

  handleChange = e => {
     const { name, value } = e.target;
     this.setState({
       [name]: value
     });
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

assignTester() {

const select = document.querySelector("select[name='DevList']")
console.log(select.value);

const options =
      {
      url: "http://localhost:5000/users/supportstoriesupdate",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      data:
      {
        userstory_id:localStorage.getItem('userStoryID'),
        userstory_to_test_by: select.value,
      }
};
axios(options)
  .then((response) => {
    alert(response.data);
  });
}

render()
{

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


    let user_dev=this.state.data;
    console.log(user_dev);
    console.log(localStorage.getItem('userID'))
    // console.log(this.state.user_stories["max_userstories"]);

    let user_story_dev=[];
    const user_story_devlist = () => {
    for(let i=0;i<user_dev.length;i++)
    {
    if(user_dev[i]["user_id"] != this.state.user_id && user_dev[i]["user_id"]!=localStorage.getItem('userID')
     && user_dev[i]["user_role"] != 'manager') {
      user_story_dev.push(<option name="user_id">{user_dev[i]["user_id"]}</option>);
    }

  }
      return user_story_dev;
}

  return (

  <div className="base-container" ref={this.props.containerRef}>
  <br/><br/><br/><br/>
    <div className="header">Add User Story </div>
    <div className="content">

  <div className="form">

  <div className="form-group">
  <label htmlFor="user_id">User ID</label>
        <select style={cssselect} name="DevList">
          {user_story_devlist()}
            </select>
  </div>
                    </div>
                    </div>
                    <div className="footer">
                    <Button theme="light" onClick={() => this.assignTester()}>Submit</Button>
                    <Button onClick={this.goBack}>Back</Button>
                    <Link to='/'><Button theme="warning" onClick={() => this.logout()}>Logout</Button></Link>
                    </div>

                  </div>

                );
              }
            }
