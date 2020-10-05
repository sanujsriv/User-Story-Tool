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


export class SupportTesting extends React.Component {

    constructor(props) {
      super(props);
      this.onLogin = this.onLogin.bind(this);
      this.goBack = this.goBack.bind(this);
      // this.handleChange = this.handleChange.bind(this);
      if(props.location.aboutProjectID != undefined)
      {
      console.log(props.location.aboutProjectID['proj_id_manager']);
      localStorage.setItem("proj_id_manager",props.location.aboutProjectID['proj_id_manager']);
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
       data_user : {},
       supportTestQueue:{},
       user_id: sessionStorage.getItem('user_id'),
       checked_analysis: false,
       checked_coding : {},
       checked_testing: false,
     })
   }

componentDidMount() {
  this.onLogin();
}


assignTester(usid,uid)
{
  const options=
  {
  url: "http://localhost:5000/users/insertsupportstories",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  data: {
    userstory_id: usid,
    userstory_done_by: uid
  }
};
axios(options)
        .then((response) => {
        alert(response.data)
        });

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
          user_id: this.state.user_id,
        }
      };
  if(this.state.user_id != "null")
  axios(options)
          .then((response) => {
            this.setState({data : response.data[0][0]["Project_userstories"]});
          });


const options2 =
      {
      url: "http://localhost:5000/users/fetch_user_SupportStories",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        Project_manager: this.state.user_id,
        Project_ID : localStorage.getItem('proj_id_manager')
      }
    };
if(this.state.user_id != "null")
axios(options2)
        .then((response) => {
          this.setState({data_user : response.data[0]});
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

 const options_fetch_man =
       {
       url: "http://localhost:5000/users/fetchsupportstoriesformanager",
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       }
     };
 if(this.state.user_id != "null")
 axios(options_fetch_man)
         .then((response) => {
           this.setState({supportTestQueue : response.data['userstorie']});
         });

}
  render(){
   let user_data=this.state.data;
   let user_data_userstories = this.state.data_user;
   console.log(user_data)
   console.log(user_data_userstories)
   console.log(this.state.check_coding)

   let supportTestingQueue =[]
   let check_coding = []
   let check_analysis=[]
   let check_testing = []


    if(this.state.supportTestQueue != undefined)
    for(let i=0;i<this.state.supportTestQueue.length;i++)
      supportTestingQueue.push(this.state.supportTestQueue[i]['testing_status']);
    console.log(supportTestingQueue)

    if(this.state.check_coding != undefined && user_data_userstories.length !=0)
    {
      for(let i=0;i<user_data.length;i++) {
      if(i < this.state.check_coding.length && i< user_data_userstories.length &&
        (this.state.check_coding[i]["userstory_id"]  === user_data[i]["UserStoryID"])) {
      check_coding.push(this.state.check_coding[i]["percent_complete"]);
      check_analysis.push(user_data_userstories[i]['analysis'])
      check_testing.push(user_data_userstories[i]['testing'])
    }
      else {
        check_coding.push(0);
      }
    }
  }
    console.log(check_coding);

    const badges = {"high": "danger", "medium": "warning", "low":"success"}
    let user_story_return = [];
    const user_story_list = () => {

      if(user_data_userstories.length == 0)
        user_story_return.push(
      <div align="center">
      <br/><br/>
      <h1>!</h1><br/>
      <h2>
          <br/><br/>
          No Data found</h2>
            <br/><br/><br/><br/>
            </div>
            );
      else {
      for (let i = 0; i < user_data_userstories.length; i++) {

        var p =parseInt(check_coding[i]*100)
        var s =user_data_userstories[i]['userstory_priority'];
        var a = parseInt(check_analysis[i]*10)
        var t = parseInt(check_testing[i]*10)

        var value1_success = parseFloat(a + p*0.8 + t).toFixed(2)
        var value1_danger = parseFloat(100 - (a + p*0.8 + t)).toFixed(2)

        var s =user_data_userstories[i]['userstory_priority'];
        // if(supportTestQueue[0] != undefined)
        // {
        if(user_data.length>0
          && supportTestingQueue[i]!=1
      )
         {
        user_story_return.push(
          <div>
          <Col>
                <Progress multi style={{ maxWidth: "300px" }}>
                {(p > 0) && (
                <Progress bar theme="success" value={value1_success}>{value1_success}</Progress>

              )}
              {(p > 0 && p <= 100) && (
              <Progress bar theme="danger" value={value1_danger}>{value1_danger}</Progress>
            )}
                {(p==0 && a!=0) && (
                <Progress bar theme="success" value={p+a+t}>{p+a+t}</Progress>
            )}
            {(p==0 && a!=0) && (
            <Progress bar theme="danger" value={100-(p+a+t)}>{100-(p+a+t)}</Progress>
        )}
          {(p==0 && a==0) && (
          <Progress bar theme="danger" value={100-(p+a+t)}>{(p+a+t)}</Progress>
      )}

              </Progress>
          <Card style={{ maxWidth: "300px" }}>
            {/*<CardHeader>User Story: {i+1} </CardHeader>*/}
            <CardHeader>
            <span style={{ float: "left" , textAlign:"left",fontSize : '12px'}}>
            ID: {user_data[i]['UserStoryID']}
            </span>
            <span style={{ float: "right" , textAlign:"right",fontSize : '12px'}}>
            {user_data[i]['etc']}
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
          <Link to={{
            pathname:'/assignSupportTester',
            aboutUserStoryDoneBy: {
              userStoryID: user_data[i]['UserStoryID'],
              userID:user_data_userstories[i]['user_id']
            }
        }}>
        <Button theme="info" onClick={() => this.assignTester(user_data[i]['UserStoryID'],user_data_userstories[i]['user_id'])}>Assign Tester</Button>
        </Link>
            </CardBody>
            <CardFooter>
              <Badge theme={badges[s]}>{s}</Badge>

            <span style={{ float: "right" , textAlign:"right",fontSize : '12px'}}> <strong>{user_data_userstories[i]['user_id']}</strong>
            </span>
            </CardFooter>
          </Card>

          <div style={{ maxWidth: "300px" , flex : "1" }}>
          <FormCheckbox small toggle inline
            checked={parseInt(check_analysis[i])}
            >
        &nbsp;<p style={{fontSize: "12px"}}>Analysis</p>
          </FormCheckbox>

          <FormCheckbox small toggle inline
            checked={
              parseInt(check_coding[i])
            }
            >
          &nbsp;<p style={{fontSize: "12px"}}>Coding</p>
          </FormCheckbox>
          <FormCheckbox small toggle inline
            checked={parseInt(check_testing[i])}>
          &nbsp;<p style={{fontSize: "12px"}}>Testing</p>
          </FormCheckbox>
          </div>
          </Col>
           <br/><br/><br/><br/>
          </div>
        );
      }
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
     <Link to='/'><Button onClick={() => this.logout()}>Logout</Button></Link>
     <Button theme="warning" onClick={this.goBack}>Back</Button>
    </Container>
);
}
}
