import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';


import {
  Button,FormSelect
} from "shards-react";


export class Selectsubstory extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          isAdded : false,
          data: {},
          value : {},
          value_story : {},
          user_stories : {},
          fetchedUserStories :{},
          user_id: sessionStorage.getItem('user_id')
        }
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
           });
   }

   logout()
   {
   sessionStorage.setItem("user_id",null);
   }


fetchUserstories(){
  const select = document.querySelector("select[name='DevList']")
  console.log(select.value);
  this.state.value = select.value;

  const options_userStories =
           {
           url: "http://localhost:5000/users/fetchUserstories",
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           data: {
             user_id:  this.state.value
           }
         };
         axios(options_userStories)
           .then((response) => {
             this.setState({fetchedUserStories : response.data[0]});
           });
   }

fetchStories()
{
  const select = document.querySelector("select[name='UserStoryList']")
  console.log(select.value);
  this.setState({value_story : select.value});
  this.render()

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

   const {isAdded } = this.state

    let user_dev=this.state.data;
    console.log(user_dev);
    let fetchedUserStories = this.state.fetchedUserStories
    console.log(fetchedUserStories);

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

let usrSelect = []
const userStorySelection = () => {
  if(fetchedUserStories !=undefined) {
  for(let i=0;i<fetchedUserStories.length;i++)
  {
    usrSelect.push(<option style={cssoptions} name="UserStory_id" value={fetchedUserStories[i]["UserStoryID"]}>{fetchedUserStories[i]["userstory_name"]}</option>);
  }
}
return usrSelect;
}

let devs=[]

  const other_Dev = () => {
  devs.push(
    <Link to={{
    pathname:'/subStories_add',
    aboutStories: {
      userstory_id: this.state.value_story,
      devUser_id:this.state.value
    }
}}>
<Button theme="light">Submit</Button>
</Link>);

return devs;
}
  return (

  <div className="base-container" ref={this.props.containerRef}>
  <br/><br/><br/><br/>
    <div className="header">Edit User Story </div>
    <div className="content">

  <div className="form">


  <div className="form-group">
  <label htmlFor="user_id">User ID</label>
  <div class="options">
        <select style={cssselect} name="DevList">
        {user_story_devlist()}
        </select>
      </div>
        <button type="button" onClick={() => this.fetchUserstories()}  className="btn">
          Select
        </button>
  </div>
  <br/>
  <br/>
  <div className="form-group">
  <label htmlFor="userstory_id">UserStory Select</label>
  <div class="options">
        <select style={cssselect} name="UserStoryList">
        {userStorySelection()}
        </select>
      </div>
        <button type="button" onClick={() => this.fetchStories()}  className="btn">
          Select
        </button>
  </div>
  <br/>
  <br/>
                 </div>
                    </div>

                    <div className="footer">
                    {other_Dev()}
                  <Link to='/manager_comp'><Button>
                      Back
                    </Button></Link>
                    <Link to='/'><Button theme="warning" onClick={() => this.logout()}>Logout</Button></Link>
                    </div>
                  </div>


                );
              }
            }
