import React from 'react';
import logo from './logo.svg';
import './App.css';


import { Alert } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import {
  Card, CardHeader, CardTitle, CardImg,CardBody,CardFooter,
  Button,
  Container,Row, Col,
  Badge,
  Progress,Slider

} from "shards-react";

const user_story = ["user_story 1", "user_story 2", "user_story 3"];
const badges = ["info", "warning","danger","secondary","success","Dark",""]

const min = 0;
const max = badges.length;
let user_story_return = [];
let badges_return=[];


const badges_list =() => {
var s=  parseInt(Math.random() * (max - min));
        badges_return.push(
    <Badge theme={badges[s]}>{badges[s]}</Badge>
  );
  return badges_return;
};

const user_story_List = () => {
  for (let i = 0; i < user_story.length; i++) {
    user_story_return.push(
      <Col>
      <Card style={{ maxWidth: "300px" }}>
        <CardHeader>User Story: </CardHeader>
        <CardImg src="" alt-text="As.... I want.... So...." />
        <CardBody>
          <CardTitle>User Story {i}</CardTitle>
          <p>(As a .. I ... So...)</p>
          <Button>Read more &rarr;</Button>
        </CardBody>
        <CardFooter>
        {
          badges_list()
        }
        </CardFooter>
      </Card>
      </Col>
    );
  }
  return user_story_return;
};

function App() {
  return (

    <Container className="dr-example-container">
           <br/><br/><br/><br/>
       <Row>
       {user_story_List()}
        </Row>

        <Row>
        {Progress}
        </Row>

     <div>

        </div>
    </Container>
);
}

export default App;
