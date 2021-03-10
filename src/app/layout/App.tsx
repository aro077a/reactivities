import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import { v4 as uuid } from 'uuid';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token =
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImJvYiIsIm5hbWVpZCI6IjYyYzU3YjkzLTMzYTgtNDZjNy1iMDRlLWYzOTc4MjhiYzBlNSIsImVtYWlsIjoiYm9iQHRlc3QuY29tIiwibmJmIjoxNjE1NDExMDU3LCJleHAiOjE2MTU0MTE2NTcsImlhdCI6MTYxNTQxMTA1N30.QcdfuxD4Io7F4leFuOHbOXO8xbSyX2XimRN3GbI1Km6THuyqntaDwjC4EOrKxtNdqkKRJDxAnU1na4rhkzGDjg';

    // agent.Activities.list().then((response) => {
    //   setActivities(response);
    // });
    axios
      .get<Activity[]>('https://reactivities.herokuapp.com/api/activities', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let activities: Activity[] = [];
        response.data.forEach((activity) => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        });
        setActivities(activities);
        setLoading(false);
      });
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((item) => item.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = (activity: Activity) => {
    activity.id
      ? setActivities([
          ...activities.filter((item) => item.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((item) => item.id !== id)]);
  };

  if (loading) return <LoadingComponent content='loading app' />;

  return (
    <Fragment>
      <Navbar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
