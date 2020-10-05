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


export class UserStory extends React.Component {

    constructor(props) {
      super(props);
      this.onLogin = this.onLogin.bind(this);
      this.goBack = this.goBack.bind(this);
      // this.handleChange = this.handleChange.bind(this);
      if(props.location.aboutProjectID != undefined)
      {
      console.log(props.location.aboutProjectID['proj_id']);
      localStorage.setItem("proj_id",props.location.aboutProjectID['proj_id']);
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
       check : [],
       analysis_completion:{},
       testing_completion:{},
       project_id:{},
       project_manager :{},
       project_ETC : {},
       project_completion : {},
       user_id: sessionStorage.getItem('user_id'),
       checked_analysis: false,
       checked_testing: false,
       check_substories_true : [],
       check_substories_false : [],
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
   // console.log(this.state.check_coding);
     console.log(this.state.project_completion)
     console.log("analysis",this.state.analysis_completion)
     console.log("testing",this.state.testing_completion)
console.log(user_data)


   let check_coding = []
   let check_analysis=[]
   let check_testing = []

   let check_coding_story=[]
   let coding ={}

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

    // const user_story = ["user_story 1", "user_story 2", "user_story 3"];
    // const badges = ["info", "warning","danger","secondary","success","Dark","Light"]

      for (let i=0;i<user_data.length;i++)
      {
        if(user_data[i]['subStories'] > 0)
        {
        this.state.check_substories_true.push(true);
        this.state.check_substories_false.push(false);
        }
      else if(user_data[i]['subStories'] === 0){
        this.state.check_substories_true.push(false);
        this.state.check_substories_false.push(true);
      }
    }

    console.log(this.state.check_substories_true);

    const badges = {"high": "danger", "medium": "warning", "low":"success"}
    let user_story_return = [];
    const user_story_list = () => {
      let k=0 , match_coding = false
      for (let i = 0; i < user_data.length; i++) {

        console.log(user_data[i]['UserStoryID'] ,check_coding_story[k]) ;

        // var p =parseInt(Math.floor(Math.random()*100));
        let p =0
        if( user_data[i]['UserStoryID'] != check_coding_story[k] ){
        p=0
        match_coding =false

      }
        else
        {
          match_coding=true
        p =parseInt(check_coding[k]*100)
        k=k+1;
      }
        console.log(p)
        var s =user_data[i]['userstory']['userstory_priority'];
        if(check_testing[i]==0) {
        var a = parseInt(check_analysis[i]*10)
        var t = parseInt(check_testing[i]*10)
        var value1_success = parseFloat(a + p*0.8 + t).toFixed(2)
        var value1_danger = parseFloat(100 - (a + p*0.8 + t)).toFixed(2)
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
          { check_testing[i] == 0 &&
            this.state.check_substories_true[i] && (
              <Link to={{
                pathname:'/subUserStory',
                aboutUserStoryID: {
                  name:user_data[i]['UserStoryID']
                }
            }}>
            <Button>Sub-User Stories &rarr;</Button>
              </Link>
            )
          }
          { check_testing[i] == 0 &&
            this.state.check_substories_false[i] && (
              <Button disabled>Sub-User Stories &rarr;</Button>
            )
          }
            </CardBody>
            <CardFooter>
            {
              <Badge theme={badges[s]}>{s}</Badge>
            }
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
            parseInt(check_coding[k-1])}
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
      <Link to='/Dev'><Button theme="Light">Present</Button></Link>
      <Link to='/futureUserStory'><Button>Future</Button></Link>
    </ButtonGroup>
    <Link to='/devSupportTesting'><Button theme="info">Support Testing</Button></Link>
    <br/><br/>
    <div>
    <span style={{ float: "left" , textAlign:"left"}}>
     Project ID: {this.state.project_id.toString()} <br/>
     Manager : {this.state.project_manager.toString()}
     </span>
     <span style={{ float: "right" , textAlign:"right"}}>
     ETC: {this.state.project_ETC.toString()} <br/>
     % Completion :{parseFloat(this.state.project_completion + this.state.analysis_completion + this.state.testing_completion).toFixed(2)}

                    <br/>
     <br/>
     </span>
     </div>

    </CardBody>
    </Card>
    </div>
      </Col></Row>
     <div align="center">

     { (user_data.length == undefined) &&
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
