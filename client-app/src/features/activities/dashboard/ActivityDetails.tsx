import { Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import Loading from "../../../app/layout/Loading";


export default function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity: activity, cancelSelectedActivity, openForm } = activityStore;
  if(!activity)
    return <Loading content="Loading..."/>

    return (
    <Card fluid>
    <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
    <CardContent>
      <CardHeader>{activity.title}</CardHeader>
      <CardMeta>
        <span>{activity.date}</span>
      </CardMeta>
      <CardDescription>
        {activity.description}
      </CardDescription>
    </CardContent>
    <CardContent extra>
      <ButtonGroup widths='2'>
        <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit'/>
        <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel'/>
      </ButtonGroup>
    </CardContent>
  </Card>
    )
}