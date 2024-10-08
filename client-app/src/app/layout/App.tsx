import { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid} from 'uuid';
import agent from '../api/agent';
import Loading from './Loading';


function App() {  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setselectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    //axios.get<Activity[]>('http://localhost:5000/api/activities')
    agent.Activities.list()
    .then(response => {
      const activities: Activity[] = [];
      response.forEach(x => {
        x.date = x.date.split("T")[0];
        activities.push(x);
      })
      setActivities(activities);
      setLoading(false);
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
    setSubmitting(true);
    if(activity.id) {
      agent.Activities.update(activity.id, activity).then(() =>{
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setselectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setselectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
      })
    }}
  

  function handleDeleteActivity(id:string){
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities(activities.filter(x => x.id !== id));
      setSubmitting(false);
    })
  }

  if(loading) return <Loading content='Loading app...'/>

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
      submitting ={submitting}
      />
   </Container>
  </Fragment>
 )
}

export default App
