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


export class DevSupportTesting extends React.Component {

    constructor(props) {
      super(props);
      this.onLogin = this.onLogin.bind(this);
      this.goBack = this.goBack.bind(this);
      // this.handleChange = this.handleChange.bind(this);
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
       supp_usid:{},
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
const options_f =
        {
        url: "http://localhost:5000/users/fetchsupportstories",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          userstory_to_test_by:this.state.user_id
        }
};
axios(options_f)
    .then((response) => {
      this.setState( { supp_usid: response.data['userstorie'][0]['userstory_id'] } );
      console.log(response.data['userstorie'][0]['userstory_done_by'])
      const options =
            {
            url: "http://localhost:5000/users/fetchUserstories",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              user_id: response.data['userstorie'][0]['userstory_done_by'],
              // userstory_id : response.data['userstorie'][0]['userstory_id']
            }
          };
      if(this.state.user_id != "null")
      axios(options)
              .then((response) => {
                this.setState({data : response.data[0]});
              });


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

// const options_projID = {
//     url: "http://localhost:5000/users/projectStatus",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: {
//       user_id: this.state.user_id,
//     }
//   };
//
// axios(options_projID)
//     .then((response) => {
//       this.setState({
//         project_completion : 100*response.data[0][0]['project_status']});
//     });
}
  render(){
   let user_data=this.state.data;
   console.log(user_data)
   console.log(this.state.check_coding);

   let check_coding = []
   let check_analysis=[]
   let check_testing = []

    if(this.state.check_coding != undefined && user_data.length >0)
    {
      for(let i=0;i<user_data.length;i++) {
      check_analysis.push(user_data[i]['userstory']['analysis'])
      check_testing.push(user_data[i]['userstory']['testing'])
      if(i < this.state.check_coding.length &&
        (this.state.check_coding[i]["userstory_id"]  === user_data[i]["UserStoryID"]))
      check_coding.push(this.state.check_coding[i]["percent_complete"]);
      else {
        check_coding.push(0);
      }
    }
  }
    console.log(check_coding);

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
    let flag=false;
    const user_story_list = () => {

      for (let i = 0; i < user_data.length; i++) {

        // console.log(this.state.checked_coding[i]);
        // var p =parseInt(Math.floor(Math.random()*100));

        var p =parseInt(check_coding[i]*100)
        var s =user_data[i]['userstory']['userstory_priority'];
        var a = parseInt(check_analysis[i]*10)
        var t = parseInt(check_testing[i]*10)

        var value1_success = parseFloat(a + p*0.8 + t).toFixed(2)
        var value1_danger = parseFloat(100 - (a + p*0.8 + t)).toFixed(2)
        if(t>0 && this.state.supp_usid === user_data[i]["UserStoryID"]) {
          flag=true;
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

          { check_testing[i]==0 &&
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

          { check_testing[i]==1 &&
            this.state.check_substories_true[i] && (
              <Link to={{
                pathname:'/pastUserSubStory',
                aboutUserStoryID: {
                  name:user_data[i]['UserStoryID']
                }
            }}>
            <Button>Sub-User Stories &rarr;</Button>
              </Link>
            )
          }

          {
            this.state.check_substories_false[i] && (
              <Button disabled>Sub-User Stories &rarr;</Button>
            )
          }
            </CardBody>
            <CardFooter>
            {
              <Badge theme={badges[s]}>{s}</Badge>
            }
            &nbsp;&nbsp;
            { check_analysis[i] ==1 && (
            <Badge>Analyzed</Badge>)
          }
            &nbsp;&nbsp;
          { check_coding[i] ==1 && (
          <Badge theme="info">Coded</Badge>)
          }
          &nbsp;&nbsp;
          { (check_testing[i] ==1) && (
          <Badge theme="light">Tested</Badge>)
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
              parseInt(check_coding[i])}
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
     <div align="center">

     { ( flag == false) &&
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
