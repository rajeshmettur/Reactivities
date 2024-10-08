import { Button, Item, ItemContent, ItemDescription, ItemExtra, ItemGroup, ItemHeader, ItemMeta, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityList() {
  const {activityStore} = useStore();
  const {deleteActivity, activitiesByDate, loading} = activityStore;
  
  const [target, setTarget] = useState('');

function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id:string) {
  setTarget(e.currentTarget.name);
  deleteActivity(id);
}
return (
<Segment>
<ItemGroup divided>
    {
        activitiesByDate.map( activity => (
            <Item key={activity.id}>
            <ItemContent>
              <ItemHeader as='a'>{activity.title}</ItemHeader>
              <ItemMeta>{activity.date}</ItemMeta>
              <ItemDescription>
              <div>{activity.description}</div>
              <div>{activity.city}, {activity.venue}</div>
              </ItemDescription>
              <ItemExtra>
                <Button  onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='View' color='blue'></Button>
                <Button name ={activity.id} loading={loading && target === activity.id} 
                onClick={(e) => handleActivityDelete(e, activity.id)} floated='right' content='Delete' color='red'></Button>
                <Label basic content={activity.category}/>
              </ItemExtra>
            </ItemContent>
          </Item>
        ))
    }
</ItemGroup>
</Segment>
)})