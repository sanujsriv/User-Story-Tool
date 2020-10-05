import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Alert ,  Button, Collapse } from "shards-react";
import {
  Container,Row, Col,
  FormTextarea,
  Dropdown,DropdownToggle,  DropdownMenu, DropdownItem,
} from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


export class UserComponents extends React.Component {

  constructor(props) {

    super(props);
    this.goBack = this.goBack.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: true ,open: false,value: null  };
    this.toggle_d = this.toggle_d.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  goBack(){
      this.props.history.goBack();
  }

componentWillMount() {
     this.setState({
       data: {},
       tasks: {},
       user_id: sessionStorage.getItem('user_id')
     })
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


  componentDidMount() {
    this.onLogin()
  }


onLogin(){
console.log(this.state.user_id);
    const options =
          {
          url: "http://localhost:5000/users/fetchUsers",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            user_id: this.state.user_id
          }
        };

        const options2 =
              {
              url: "http://localhost:5000/users/fetchUserStories",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              data: {
                user_id: this.state.user_id
              }
            };

    axios(options)
            .then((response) => {
              this.setState({data : response.data[0]});
            });
  axios(options2)
          .then((response) => {
            this.setState({tasks : response.data[0]});
          });
      const options_projID = {
          url: "http://localhost:5000/users/fetchProjectID",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            user_id: this.state.user_id,
          }
        };

      axios(options_projID)
          .then((response) => {
            this.setState({
              ProjectID : response.data[0]['Project_ID']});
          });

  }

render() {
  let user_data=this.state.data;
  let user_tasks=this.state.tasks;
  console.log(user_data);
  console.log(user_tasks);

  const { value } = this.state;

  let user_story_task = [];
  const user_story_list = () => {
    for (let i=0;i<user_tasks.length;i++)
    {
      user_story_task.push(user_tasks[i]['userstory_name']+", ");
    }
    return user_story_task;

}
    return (
      <Container name="UserComponents">
      <br/><br/>
      <div>
        <Button onClick={this.toggle}>Info</Button>
        <Collapse open={this.state.collapse}>
          <div className="p-3 mt-3 border rounded">
            <h5>Greetings!! Developer</h5>
            <span>
              <pre>
              [Profile]
              <br/>
              ID: {this.state.user_id}
              <br/>
              Name: {user_data["first_name"]+" "+user_data["last_name"]}
              <br/>
              Tasks: {user_story_list()}
              {}
              </pre>
            </span>
          </div>
        </Collapse>

    <br/><br/>

    {/*<div>
    <p><span><strong> Comments : </strong></span></p>
        <p className="mb-2">
          {(value && `🗣 ${value}`) || "🤔 Waiting for you to say something..."}
        </p>
        <FormTextarea onChange={this.handleChange} />
      </div>
*/}
          <br/><br/>
      <Dropdown open={this.state.open} toggle={this.toggle_d} group>
        <Button align="right">Go To</Button>
        <DropdownToggle split />
        <DropdownMenu>

        <Link to="/"><DropdownItem>Home</DropdownItem></Link>
        <Link to={{
          pathname:'/Dev',
          aboutProjectID: {
            proj_id: this.state.ProjectID
          }
      }}>
          <DropdownItem>My Tasks</DropdownItem></Link>
          <Link to="/unittest">
          <DropdownItem >Unit testing</DropdownItem>
          </Link>
          <Link to="/viewMyStories">
          <DropdownItem >View My Stories</DropdownItem>
          </Link>
          <Link to={{
            pathname:'/devStories',
            aboutProjectID: {
              proj_id: this.state.ProjectID
            }
        }}>
          <DropdownItem >View Other Stories</DropdownItem>
          </Link>
          <Link to="/devSupportTesting">
          <DropdownItem >Support Testing</DropdownItem>
          </Link>
        </DropdownMenu>
      </Dropdown>
        <br/><br/>  <br/><br/>  <br/><br/>
    </div>
    <div align="center">
    <Button theme="warning" onClick={this.goBack}>Back</Button>
   <Link to='/'><Button onClick={() => this.logout()}>Logout</Button></Link>
    </div>
      </Container>
    );
  }
}
