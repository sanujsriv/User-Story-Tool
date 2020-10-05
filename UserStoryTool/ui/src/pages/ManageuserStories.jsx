import React from "react";
import {Container, Button,FormSelect,FormRadio } from "shards-react";
import axios from "axios";
export class ManageuserStories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDeveloper: null
    };

    this.changeDeveloper = this.changeDeveloper.bind(this);
  }

  changeDeveloper(action) {
    this.setState({
      selectedDeveloper: action
    });
  }

  logout()
  {
  sessionStorage.setItem("user_id",null);
  }

  componentWillMount() {
       this.setState({
         data: {},
         user_id: sessionStorage.getItem('user_id')
       })
     }

     componentDidMount() {
       this.onLogin()
     }

  onLogin(){
  const options2 =
        {
        url: "http://localhost:5000/users/fetchAllUsers",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
   if(this.state.user_id != "null")
      axios(options2)
        .then((response) => {
          this.setState({data : response.data[0]});
        });
}

  render() {

    let user_dev=this.state.data;
    console.log(user_dev);

    let user_story_dev=[];
    const user_story_devlist = () => {
    for(let i=0;i<user_dev.length;i++)
    {
    if(user_dev[i]["user_role"] === "developer"){
      user_story_dev.push(<option value="User">{user_dev[i]["user_id"]}</option>);
    }
    else{
      user_story_dev.push(<option value="User" disabled>{user_dev[i]["user_id"]}</option>);
    }
    console.log(user_dev.length);
    console.log(user_story_dev);
  }
      return user_story_dev;

  }

    return (
<Container name="ManageuserStories">
<br/><br/>
<div>
      <FormSelect>
      {user_story_devlist()}
      </FormSelect>
</div>
<br/><br/><br/><br/>
      <div>
        <div>
          <p className="mb-2">Select action:</p>
          <FormRadio
            inline
            name="add"
            checked={this.state.selectedDeveloper === "add"}
            onChange={() => {
              this.changeDeveloper("add");
            }}
          >
        Add
          </FormRadio>
          <FormRadio
            inline
            name="Developer2"
            checked={this.state.selectedDeveloper ==="delete"}
            onChange={() => {
              this.changeDeveloper("delete");
            }}
          >
            Delete
          </FormRadio>
          <FormRadio
            inline
            name="Developer3"
            checked={this.state.selectedDeveloper === "edit"}
            onChange={() => {
              this.changeDeveloper("edit");
            }}
          >
          Edit
          </FormRadio>
        </div>
        <span>
          <strong>Selected Action:</strong>{" "}
          <span>{this.state.selectedDeveloper || "none"}</span>
        </span>
      </div>
<br/><br/>
      <div align="center">
      <Button type="submit"> Submit </Button>
      </div>
  </Container>
    );
  }
}
