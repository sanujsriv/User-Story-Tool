import React , {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {
UserComponents,
ManagerComponents,
ManageuserStories,
Login_Register,
  NotFound,
  UserStory,
  AddDelEdit,
  AddUserStory,
  DelUserStory,
  EditUserStory,
  SubUserStory,
  SubUserStoryStatus,
  ViewAllStories,
  FutureUserStory,
  AnalysisComplete,
  UnitTest,
  PastUserStory,
  TestingComplete,
  PastUserSubStory,
  ViewMyStories,
  ViewOtherDevStories,
  DevStories,
EditSelectUserStory,
SupportTesting,
AssignSupportTester,
DevSupportTesting,
Selectsubstory,
SubStoriesAdd,
SubStories_delete,
SubStories_update,
SelectEditSubStory,
SubUserStoryView,


} from './pages'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'


class App extends Component
{
render()
    {
  return (
  <Router>
    <Switch>
        <Route exact path="/" component={Login_Register}/>
        <Route exact path="/user_comp" component={UserComponents}/>
        <Route exact path="/manager_comp" component={ManagerComponents}/>
        <Route exact path="/ManageuserStories" component={ManageuserStories}/>
        <Route exact path="/Dev" component={UserStory}/>
        <Route exact path="/addUserStory" component={AddUserStory}/>
        <Route exact path="/delUserStory" component={DelUserStory}/>
        <Route exact path="/editUserStory" component={EditUserStory}/>
        <Route exact path="/editSelectUserStory" component={EditSelectUserStory}/>
        <Route exact path="/subUserStory" component={SubUserStory}/>
        <Route exact path="/subUserStoryStatus" component={SubUserStoryStatus}/>
        <Route exact path="/viewAllStories" component={ViewAllStories}/>
        <Route exact path="/futureUserStory" component={FutureUserStory}/>
        <Route exact path="/analysisComplete" component={AnalysisComplete}/>
        <Route exact path="/TestingComplete" component={TestingComplete}/>
        <Route exact path="/unittest" component={UnitTest}/>
        <Route exact path="/pastUserStory" component={PastUserStory}/>
        <Route exact path="/pastUserSubStory" component={PastUserSubStory}/>
        <Route exact path="/ViewMyStories" component={ViewMyStories}/>
        <Route exact path="/ViewOtherDevStories" component={ViewOtherDevStories}/>
        <Route exact path="/devStories" component={DevStories}/>
        <Route exact path="/supportTesting" component={SupportTesting}/>
        <Route exact path="/assignSupportTester" component={AssignSupportTester}/>
        <Route exact path="/devSupportTesting" component={DevSupportTesting}/>
        <Route exact path="/selectsubstory" component={Selectsubstory}/>
        <Route exact path="/subStories_add" component={SubStoriesAdd}/>
        <Route exact path="/subStories_update" component={SubStories_update}/>
        <Route exact path="/subStories_delete" component={SubStories_delete}/>
        <Route exact path="/selectEditSubStory" component={SelectEditSubStory}/>
        <Route exact path="/subUserstories_view" component={SubUserStoryView}/>








        <Route component={NotFound} />
    </Switch>
  </Router>
        );
    }
}


export default App;
