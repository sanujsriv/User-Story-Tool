import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {Button } from "shards-react";

export class SubUserStoryStatus extends React.Component
{
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    // this.onLogin = this.onLogin.bind(this);
    if(props.location.aboutSubStoryID != undefined)
    {
    console.log(props.location.aboutSubStoryID['name'],props.location.aboutSubStoryID['status']);
    localStorage.setItem("user_sub_story_id",props.location.aboutSubStoryID['name']);
    localStorage.setItem("user_sub_story_status",props.location.aboutSubStoryID['status']);
    }
    else
    {
    console.log(localStorage.getItem("user_sub_story_id"))
    console.log(localStorage.getItem("user_sub_story_status"))
    }
}

goBack(){
    this.props.history.goBack();
}

logout()
{
sessionStorage.setItem("user_id",null);
}

componentWillMount() {
   this.setState({
     data: {},
     isChanged : false,
     user_id: sessionStorage.getItem('user_id')
   })
 }

componentDidMount() {
this.onChange();
}

onChange()
{
  console.log(typeof(localStorage.getItem("user_sub_story_status")))
  if(localStorage.getItem("user_sub_story_status") == 0)
    localStorage.setItem("user_sub_story_status",1);
  else if(localStorage.getItem("user_sub_story_status") == 1)
    localStorage.setItem("user_sub_story_status",0);

    const options =
          {
          url: "http://localhost:5000/users/changeSubStoryStatus",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            substory_id: localStorage.getItem("user_sub_story_id"),
            completed : localStorage.getItem("user_sub_story_status")
          }
        };

    axios(options)
            .then((response) => {
              console.log(response);
                if (response.status === 200)
                 {
                   this.setState({isChanged: true});
                   // alert(response.data.message);
                 }
                 console.log(this.state.isChanged);
                 })
                 .catch(function(error) {
                   console.log(error.response);
                  // alert(error.response);
            });
}

render() {
console.log(localStorage.getItem("user_sub_story_status"))
      return (
          <div align="center">
          <br/><br/>
          <h1>Done</h1><br/><br/><br/>
          <h2>
              <br/><br/>
              Status Changed!</h2>
              <br/><br/><br/><br/>
              <Button theme="warning" onClick={this.goBack}>Back</Button>
          </div>
            );
          }
  }
