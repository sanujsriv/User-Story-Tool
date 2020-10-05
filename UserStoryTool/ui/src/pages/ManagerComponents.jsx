import React from "react";
import { Link } from 'react-router-dom';
import { Alert ,  Button, Collapse } from "shards-react";
import {
  Container,Row, Col,
  FormTextarea,
  Dropdown,DropdownToggle,  DropdownMenu, DropdownItem,
} from "shards-react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


export class ManagerComponents extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { collapse: true ,open: false,value: null  };
    this.toggle_d = this.toggle_d.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  logout()
  {
  sessionStorage.setItem("user_id",null);
  }

    handleChange(e) {
      this.setState({ value: e.target.value });
    }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggle_d() {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  }

  componentWillMount() {
       this.setState({
         data: {},
         data_userstories : {},
         devs: {},
         user_id: sessionStorage.getItem('user_id')
       })
     }

  componentDidMount() {
    this.onLogin()
  }


  onLogin(){

    const options =
          {
          url: "http://localhost:5000/users/fetchProjectUserstories",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            user_id: this.state.user_id
          }
        };
    if(this.state.user_id != "null")
    axios(options)
            .then((response) => {
              this.setState({data_userstories : response.data[0][0]['Project_userstories']});
            })
            .catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message);
             throw error;
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
        this.setState({ProjectID : response.data[0][0]['Project_ID']})
      });
}
  render() {

    let active = true
    let disabled = false
    let user_data=this.state.data;
    let user_data_userstories = this.state.data_userstories;
    console.log(user_data_userstories);
    console.log(user_data);

    if (user_data_userstories.length == undefined)
    {
        active=false
        disabled = true
      }

    const { value } = this.state;

    let user_story_devs = [];
    let user_story_assigned=[];

    const user_story_devlist = () => {
      for (let i=0;i<user_data.length;i++)
      { if(user_data[i]['user_id'] != this.state.user_id )
        user_story_devs.push(user_data[i]['user_id']+", ");
      }
      return [...new Set(user_story_devs)];
     }

     const user_story_assignedlist = () => {
       for (let i=0;i<user_data_userstories.length;i++)
       {user_story_assigned.push(user_data_userstories[i]['userstory_name']+", ");}
       return [...new Set(user_story_assigned)];
      }

    return (
      <Container name="UserComponents">
      <br/><br/>
      <div>
        <Button onClick={this.toggle}>Info</Button>
        <Collapse open={this.state.collapse}>
          <div className="p-3 mt-3 border rounded">
            <h5>Greetings!! Manager</h5>
            <span>
              <pre>
              [Profile]
              <br/>
              ID: {this.state.user_id}
              <br/>
              Devs Under: {user_story_devlist()}
              <br/>
              Project User-stories: {user_story_assignedlist()}
              </pre>
            </span>
          </div>
        </Collapse>

    <br/><br/>
          <br/><br/>



        <Dropdown open={this.state.open} toggle={this.toggle_d} group>
        <Button align="right">Go To</Button>

        { active &&
          (  <DropdownToggle split/> )
        }
        { disabled &&
          ( <DropdownToggle split disabled/> )
        }

        <DropdownMenu>

        {/*<Link to="/"><DropdownItem>Home</DropdownItem></Link>*/}
          {/*<Link to="/ManageuserStories">
          <DropdownItem>Manage Tasks</DropdownItem>
          </Link>*/}
          <Link to="/addUserStory">
          <DropdownItem>Add User Story</DropdownItem>
          </Link>
          <Link to="/delUserStory">
          <DropdownItem>Delete User Story</DropdownItem>
          </Link>
          <Link to="/editSelectUserStory">
          <DropdownItem>Edit User Story</DropdownItem>
          </Link>
          <Link to="/viewAllStories">
          <DropdownItem>View All Stories</DropdownItem>
          </Link>
          <Link to={{
            pathname:'/supportTesting',
            aboutProjectID: {
              proj_id_manager: this.state.ProjectID
            }
        }}>
          <DropdownItem >Assign Support Tester</DropdownItem>
          </Link>

          <Link to="/selectsubstory">
          <DropdownItem>Add Sub User Story</DropdownItem>
          </Link>
          <Link to="/subStories_delete">
          <DropdownItem>Delete Sub User Story</DropdownItem>
          </Link>
          <Link to="/selectEditSubStory">
          <DropdownItem>Edit Sub User Story</DropdownItem>
          </Link>


        </DropdownMenu>
      </Dropdown>
        <br/><br/>  <br/><br/>  <br/><br/>
    </div>
    <div align="center">
     <Link to='/'><Button onClick={() => this.logout()}>Logout</Button></Link>
    </div>
      </Container>
    );
  }
}
