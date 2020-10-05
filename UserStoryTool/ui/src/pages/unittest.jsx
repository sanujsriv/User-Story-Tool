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


export class UnitTest extends React.Component {

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
       checked_testing_true : [],
       checked_testing_false : [],
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
            });


  const options_projID = {
    url: "http://localhost:5000/users/projectStatus",
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
        project_completion : 100*response.data[0][0]['project_status']});
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
    let check_coding= [];
    let coding ={}
    let check_coding_story=[]
    let check_analysis = [];
    let check_testing=[];



    if(this.state.check_coding != undefined)
        coding=this.state.check_coding
        console.log(coding)

    for(let i=0;i<user_data.length;i++)
    {
      check_analysis.push(user_data[i]['userstory']['analysis'])
      check_testing.push(user_data[i]['userstory']['testing'])
    }

       for(let i=0;i<coding.length;i++) {
         for(let j=0;j<user_data.length;j++) {
               if( coding[i]["userstory_id"]  == user_data[j]["UserStoryID"])
               {
                   check_coding.push(coding[i]["percent_complete"]);
                   check_coding_story.push(coding[i]["userstory_id"])
                   break;
               }
     }
   }

     console.log(check_coding);
       console.log(check_coding_story);

      for (let i=0;i<user_data.length;i++)
      {
        if(user_data[i]['userstory']['testing'] ===1)
        {
        this.state.checked_testing_true.push(true);
        this.state.checked_testing_false.push(false);
        }
      else if(user_data[i]['userstory']['testing'] === 0){
        this.state.checked_testing_true.push(false);
        this.state.checked_testing_false.push(true);
      }
    }
    let flag=false;
    let k=0;
    const badges = {"high": "danger", "medium": "warning", "low":"success"}
    let user_story_return = [];
    const user_story_list = () => {
      for (let i = 0; i < user_data.length; i++) {
          k=k+1;
          console.log(parseInt(check_coding[k-1]))
        // console.log(this.state.checked_coding[i]);
        // var p =parseInt(Math.floor(Math.random()*100));
        // var p =parseInt(checked_analysis[i])
        var s =user_data[i]['userstory']['userstory_priority'];
        if( (check_coding_story[k-1] == user_data[i]['UserStoryID']) && check_analysis[i] ==1
        && parseInt(check_coding[k-1]) == 1)
        {  flag = true;
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
            this.state.checked_testing_false[i] && (
              <Link to={{
                pathname:'/testingComplete',
                aboutUserStoryTesting: {
                  name:user_data[i]['UserStoryID'],
                  testing : 0
                }
            }}>
            <Button theme="danger">Testing: Incomplete</Button>
              </Link>
            )
          }
          {
            this.state.checked_testing_true[i] && (
              <Link to={{
                pathname:'/testingComplete',
                aboutUserStoryTesting: {
                  name:user_data[i]['UserStoryID'],
                  testing : 1
                }
            }}>
              <Button disabled theme="success">Unit Testing : Completed</Button>
              </Link>
            )
          }
            </CardBody>
            <CardFooter>
            {
              <Badge theme={badges[s]}>{s}</Badge>
            }
            &nbsp;&nbsp;
            { (check_analysis[i] ==1) && (
            <Badge>Analyzed</Badge>)
          }
            &nbsp;&nbsp;
          { parseInt(check_coding[k-1]) && (
          <Badge theme="info">Coded</Badge>)
        }
        &nbsp;&nbsp;
        { (check_testing[i] ==1 ) && (
        <Badge theme="light">Tested</Badge>)
      }

            </CardFooter>
          </Card>

          </Col>
           <br/><br/><br/><br/>
          </div>
        );
      }
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
     <br/><br/><br/><br/>
     <Link to='/user_comp'><Button theme="danger">Home</Button></Link>
     <Button theme="warning" onClick={this.goBack}>Back</Button>
     <Link to='/'><Button onClick={() => this.logout()}>Logout</Button></Link>
     </div>
    </Container>
);
}
}
