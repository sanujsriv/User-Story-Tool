import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router";
import { Alert } from "shards-react";
import { UserComponents } from '.'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import {
  Card, CardHeader, CardTitle, CardImg,CardBody,CardFooter,
  Button,
  Container,Row, Col,
  Badge,
  Progress,Slider,
  ButtonGroup
} from "shards-react";


export class SubUserStory extends React.Component {

    constructor(props) {
      super(props);
      this.onLogin = this.onLogin.bind(this);
      this.goBack = this.goBack.bind(this);
      if(props.location.aboutUserStoryID != undefined)
      {
      console.log(props.location.aboutUserStoryID['name']);
      localStorage.setItem("user_story_id",props.location.aboutUserStoryID['name']);
      }
      else
      {
      console.log(localStorage.getItem("user_story_id"))
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
       substories_complete: [],
       substories_incomplete : [],
       user_id: sessionStorage.getItem('user_id')
     })
   }

componentDidMount() {
  this.onLogin();
}


onLogin(){
  const options =
        {
        url: "http://localhost:5000/users/fetchSubstories",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          userstory_id: localStorage.getItem("user_story_id"),
        }
      };
if(this.state.user_id != "null")
  axios(options)
          .then((response) => {
            this.setState({data : response.data[0]});
          });

}

  render(){
    let user_data=this.state.data;
    console.log(user_data)

    for (let i=0;i<user_data.length;i++)
    {
      if(user_data[i]['completed'] == 1)
      {
        console.log("Completed: ",user_data[i]['completed'])
        this.state.substories_complete.push(true);
        this.state.substories_incomplete.push(false);
      }
    else if(user_data[i]['completed'] == 0){
       console.log("Completed: ",user_data[i]['completed'])
      this.state.substories_complete.push(false);
      this.state.substories_incomplete.push(true);
    }
  }

    // const badges = ["info", "warning","danger","secondary","success","Dark","Light"]
    let user_story_return = [];
    let flag=false;
    const user_story_list = () => {
      for (let i = 0; i < user_data.length; i++) {
        flag = true;
        var p =parseInt(Math.floor(Math.random()*100));
        var s =user_data[i]['userstory_priority'];
        user_story_return.push(
          <div>
          <Col>
          <Card style={{ maxWidth: "300px" }}>
            <CardHeader>
            <span style={{ float: "left" , textAlign:"left",fontSize : '14px'}}>
            SubStory ID: {user_data[i]['substory_id']}
            </span>
            <span style={{ float: "right" , textAlign:"right",fontSize : '12px'}}>
            > {user_data[i]['etc']}
            </span>
            </CardHeader>
            <CardImg src="" alt-text="As.... I want.... So...." />
            <CardBody>
              <CardTitle>{user_data[i]['subuserstory_name']} </CardTitle>
              <div>
          {user_data[i]['Desc_As']+ " " +
          user_data[i]['Desc_I']+ " " +
          user_data[i]['Desc_So']}
          </div>

            </CardBody>
            <CardFooter>
            {
            this.state.substories_complete[i] && (
            <Badge theme="success">Complete</Badge>
          )
            }
            {this.state.substories_incomplete[i] && (
            <Badge theme="warning">Inomplete</Badge>
          )
            }

            </CardFooter>
          </Card>
          {/*<Progress multi style={{ maxWidth: "300px" }}>
                <Progress bar theme="danger" value={p}>{p}</Progress>
                <Progress bar theme="success" value={100-p}>{100-p}</Progress>
              </Progress>*/}
              <br/>
              {this.state.substories_complete[i] == false && (
                <Link to={{
                  pathname:'/subUserStoryStatus',
                  aboutSubStoryID: {
                    name:user_data[i]['substory_id'],
                    status: 0
                  }
              }}>
              <Button theme="success" style = {{ maxWidth : "150px" , padding : "5px"}}>Mark as Complete</Button>
              </Link>
            )
            }
            {this.state.substories_incomplete[i] == false && (
              <Link to={{
                pathname:'/subUserStoryStatus',
                aboutSubStoryID: {
                  name:user_data[i]['substory_id'],
                  status: 1
                }
            }}>
            <Button theme="warning" style = {{ maxWidth : "150px" , padding : "5px"}}>Mark as Incomplete</Button>
            </Link>
          )
          }
          </Col>
           <br/><br/><br/><br/>

          </div>
        );
      }
      return user_story_return;
    };

  return (
    <Container className="dr-example-container">
           <br/><br/><br/><br/>
       <Row>
       {user_story_list()}
       </Row>
       <div align="center">
       { (flag == false) &&
          ( <div>
            <br/><br/>
            <h1>!</h1><br/>
            <h2>
                <br/><br/>
                No Data found</h2>
                  <br/><br/><br/><br/>
                  </div>
          )
       }
         <Button onClick={this.goBack}>Back</Button>
         <Link to='/'><Button theme="warning" onClick={() => this.logout()}>Logout</Button></Link>
<br/><br/><br/><br/>
         </div>
    </Container>
  );
}
}
