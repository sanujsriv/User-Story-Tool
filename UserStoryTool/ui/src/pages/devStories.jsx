import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';


import {
  Button,FormSelect
} from "shards-react";


export class DevStories extends React.Component {

  constructor(props) {
    super(props);
      this.goBack = this.goBack.bind(this);
      this.state = {
          isAdded : false,
          data: {},
          value : {},
          user_stories : {},
          fetchedUserStories :{},
          user_id: sessionStorage.getItem('user_id')
        }

        if(props.location.aboutProjectID != undefined)
        {
        console.log(props.location.aboutProjectID['proj_id']);
        localStorage.setItem("proj_id",props.location.aboutProjectID['proj_id']);
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

   const options2 =
         {
         url: "http://localhost:5000/users/fetchProjectDevs",
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         data: {
           Project_ID: localStorage.getItem("proj_id")
         }
       };
   if(this.state.user_id != "null")
   axios(options2)
           .then((response) => {
             this.setState({data : response.data[0]});
           });
   }

   logout()
   {
   sessionStorage.setItem("user_id",null);
   }

   fetchUserstories(){
     const select = document.querySelector("select[name='DevList']")
     console.log(select.value);
    this.setState({value : select.value});
     this.render()
   }

render()
{
  const dev_id=this.state.value

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

    let user_story_dev=[];
    const user_story_devlist = () => {
    for(let i=0;i<user_dev.length;i++)
    {
    if(user_dev[i]["user_id"] != this.state.user_id && user_dev[i]["user_role"]!="manager"){
      user_story_dev.push(<option style={cssoptions} name="user_id" value={user_dev[i]["user_id"]}>{user_dev[i]["user_id"]}</option>);
    }
  }
      return user_story_dev;

  }

let devs=[]

  const other_Dev = () => {
  devs.push(
    <Link to={{
    pathname:'/viewOtherDevStories',
    aboutStories: {
      dev_id: this.state.value
    }
}}>
<Button theme="light">Submit</Button>
</Link>);
return devs;
}



  return (

  <div className="base-container" ref={this.props.containerRef}>
  <br/><br/><br/><br/>
    <div className="header">Other Devs Stories</div>
    <div className="content">

  <div className="form">


  <div className="form-group">
  <label htmlFor="user_id">Devs</label>
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
                 </div>
                    </div>

                    <div className="footer">
                    {other_Dev()}
                   <Button onClick={this.goBack}>Back</Button>
                    <Link to='/'><Button theme="warning" onClick={() => this.logout()}>Logout</Button></Link>
                    </div>

                  </div>


                );
              }
            }
