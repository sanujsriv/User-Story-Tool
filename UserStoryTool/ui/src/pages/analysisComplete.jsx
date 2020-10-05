import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {Button } from "shards-react";

export class AnalysisComplete extends React.Component
{
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    // this.onLogin = this.onLogin.bind(this);
    if(props.location.aboutUserStoryAnalysis != undefined)
    {
    console.log(props.location.aboutUserStoryAnalysis['name'],props.location.aboutUserStoryAnalysis['analysis']);
    localStorage.setItem("user_user_story_id",props.location.aboutUserStoryAnalysis['name']);
    localStorage.setItem("user_userstory_analysis",props.location.aboutUserStoryAnalysis['analysis']);
    }
    else
    {
    console.log(localStorage.getItem("user_user_story_id"))
    console.log(localStorage.getItem("user_userstory_analysis"))
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
  console.log(typeof(localStorage.getItem("user_userstory_analysis")))
  if(localStorage.getItem("user_userstory_analysis") == 0)
    localStorage.setItem("user_userstory_analysis",1);
  else if(localStorage.getItem("user_userstory_analysis") == 1)
    localStorage.setItem("user_userstory_analysis",0);

    const options =
          {
          url: "http://localhost:5000/users/changeUserStoryAnalysis",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            userstory_id: localStorage.getItem("user_user_story_id"),
            analysis : localStorage.getItem("user_userstory_analysis")
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
console.log(localStorage.getItem("user_userstory_analysis"))
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
