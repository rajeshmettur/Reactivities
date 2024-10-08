import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid} from 'uuid';


function App() {  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setselectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response => {
      setActivities(response.data);
    })
  },[])

  function handleSelectedActivity(id:string) {
    setselectedActivity(activities.find(x => x.id === id));
  }
  function handleCancelSelectActivity() {
    setselectedActivity(undefined);
  }

  function handleFormOpen(id? : string){
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    id ? handleSelectedActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) 
    : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setselectedActivity(activity);
  }

  function handleDeleteActivity(id:string){
    setActivities(activities.filter(x => x.id !== id));
  }

 return (
  <Fragment>
  <NavBar openForm={handleFormOpen}/>
  <Container style={{marginTop:'7em'}}>
      <ActivityDashBoard activities={activities} 
      selectedActivity = {selectedActivity} 
      selectActivity = {handleSelectedActivity} 
      cancelSelectActivity = {handleCancelSelectActivity}
      editMode ={editMode} 
      openForm ={handleFormOpen} 
      closeForm = {handleFormClose}
      createOrEdit = {handleCreateOrEditActivity}
      deleteActivity = {handleDeleteActivity}
      />
   </Container>
  </Fragment>
 )
}

export default App
