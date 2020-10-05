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
  ButtonGroup,
  FormCheckbox
} from "shards-react";


export class FutureUserStory extends React.Component {

    constructor(props) {
      super(props);
      this.onLogin = this.onLogin.bind(this);
      this.goBack = this.goBack.bind(this);
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
       project_id:{},
       project_manager :{},
       project_ETC : {},
       project_completion : {},
       user_id: sessionStorage.getItem('user_id'),
       checked_analysis: {},
       checked_analysis_true : [],
       checked_analysis_false : [],
     })
   }

componentDidMount() {
  this.onLogin();
}

onLogin(){

  const options =
        {
        url: "http://localhost:5000/users/fetchUserStories",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          user_id: this.state.user_id,
        }
      };
  if(this.state.user_id != "null")
  axios(options)
          .then((response) => {
            this.setState({data : response.data[0]});
          });

const options_userproject =
      {
      url: "http://localhost:5000/users/fetchUserProjects",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        user_id: this.state.user_id,
      }
    };

    if(this.state.user_id != "null")
    axios(options_userproject)
            .then((response) => {
              this.setState({
                project_id : response.data[0]["Project"]["Project_ID"] ,
                project_manager :  response.data[0]["Project"]["Project_manager"],
                project_ETC : response.data[0]["Project"]["Project_ETC"]
              });

              const options_projID = {
                  url: "http://localhost:5000/users/projectStatus",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: {
                    Project_ID: this.state.project_id,
                  }
                };

              axios(options_projID)
                  .then((response) => {
                    this.setState({
                      project_completion : 80*response.data[0][0]['project_status']});
                  });

              const options_ana_test = {
                  url: "http://localhost:5000/users/fetchAllUser_UserStories",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: {
                    Project_ID: this.state.project_id,
                  }
                };

              axios(options_ana_test)
                  .then((response) => {
                    this.setState({
                      analysis_completion : 10*response.data[0][0]['analysis_complete'],
                      testing_completion : 10*response.data[0][0]['testing_complete']
                    });
                  });
            });


  const options_compSS = {
       url: "http://localhost:5000/users/compSubstories",
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
     };
  axios(options_compSS)
       .then((response) => {
         this.setState({
           check_coding : response.data[0]});
       });
}

  render(){
   let user_data=this.state.data;
   if(user_data[0] != undefined)
    console.log(user_data[0]['userstory']['analysis'])

      for (let i=0;i<user_data.length;i++)
      {
        if(user_data[i]['userstory']['analysis'] > 0)
        {
        this.state.checked_analysis_true.push(true);
        this.state.checked_analysis_false.push(false);
        }
      else if(user_data[i]['userstory']['analysis'] === 0){
        this.state.checked_analysis_true.push(false);
        this.state.checked_analysis_false.push(true);
      }
    }

    const badges = {"high": "danger", "medium": "warning", "low":"success"}
    let user_story_return = [];
    const user_story_list = () => {

      for (let i = 0; i < user_data.length; i++) {
        // console.log(this.state.checked_coding[i]);
        // var p =parseInt(Math.floor(Math.random()*100));
        // var p =parseInt(checked_analysis[i])
        var s =user_data[i]['userstory']['userstory_priority'];
        user_story_return.push(
          <div>
          <Col>
          <Card style={{ maxWidth: "300px" }}>
            {/*<CardHeader>User Story: {i+1} </CardHeader>*/}
            <CardHeader>
            <span style={{ float: "left" , textAlign:"left",fontSize : '12px'}}>
            ID: {user_data[i]['UserStoryID']}
            </span>
            <span style={{ float: "right" , textAlign:"right",fontSize : '12px'}}>
            > {user_data[i]['etc']}
            </span>
            </CardHeader>
            <CardImg src="" alt-text="As.... I want.... So...." />
            <CardBody>
              <CardTitle>User Story - {user_data[i]['userstory_name']} </CardTitle>
              <div>
          {user_data[i]['Desc_As']+ " " +
          user_data[i]['Desc_I']+ " " +
          user_data[i]['Desc_So']}
          </div>
          {
            this.state.checked_analysis_false[i] && (
              <Link to={{
                pathname:'/analysisComplete',
                aboutUserStoryAnalysis: {
                  name:user_data[i]['UserStoryID'],
                  analysis : 0
                }
            }}>
            <Button theme="danger">Analysis : Incomplete</Button>
              </Link>
            )
          }
          {
            this.state.checked_analysis_true[i] && (
              <Link to={{
                pathname:'/analysisComplete',
                aboutUserStoryAnalysis: {
                  name:user_data[i]['UserStoryID'],
                  analysis : 1
                }
            }}>
              <Button disabled theme="success">Analysis : Completed</Button>
              </Link>
            )
          }
            </CardBody>
            <CardFooter>
            {
              <Badge theme={badges[s]}>{s}</Badge>
            }
            </CardFooter>
          </Card>

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
<br/><br/><br/><br/>
        <Row><Col>
      <div align="center">
      <Card style={{ maxWidth: "600px"}}>
      <CardHeader>Status </CardHeader>
      <CardBody>
      <ButtonGroup>
      <Link to='/pastUserStory'><Button>Past</Button></Link>
      <Link to='/Dev'><Button>Present</Button></Link>
      <Link to='/futureUserStory'><Button theme="Light">Future</Button></Link>
    </ButtonGroup>
    <Link to='/supportTesting'><Button theme="warning" onClick={() => this.logout()}>Support Testing</Button></Link>
    <br/><br/>
    <div>
    <span style={{ float: "left" , textAlign:"left"}}>
     Project ID: {this.state.project_id.toString()} <br/>
     Manager : {this.state.project_manager.toString()}
     </span>
     <span style={{ float: "right" , textAlign:"right"}}>
     ETC: {this.state.project_ETC.toString()} <br/>
     % Completion :{parseFloat(this.state.project_completion + this.state.analysis_completion + this.state.testing_completion).toFixed(2)}<br/>
     <br/>
     </span>
     </div>

    </CardBody>
    </Card>
    </div>
      </Col></Row>


     <div align="center">
     <br/><br/><br/><br/>
     <Link to='/user_comp'><Button theme="danger">Home</Button></Link>
     <Button theme="warning" onClick={this.goBack}>Back</Button>
     <Link to='/'><Button onClick={() => this.logout()}>Logout</Button></Link>
     </div>
    </Container>
);
}
}
