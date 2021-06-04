import { useEffect, useState } from 'react';

import api from '../../api/api';
import UTCtoDateString from '../../utils/UTCtoDateString';
import UTCtoTimeString from '../../utils/UTCtoTimeString';

import NewEventForm from '../NewEventForm/NewEventForm';
import EditEventForm from '../EditEventForm/EditEventForm';



function Home({userId, setLoggedIn}) {
  const [events, setEvents] = useState([]);
  const [hideNewEventForm, setHideNewEventForm] = useState(true);
  const [hideEditEventForm, setHideEditEventForm] = useState(true);
  const [event, setEvent] = useState({});


  function handleNewEvent(e) {
    setHideNewEventForm(false);
    setHideEditEventForm(true);

  }

  function handleEditEvent(e) {
    setHideEditEventForm(false);
    setHideNewEventForm(true);
    setEvent(event);
  }

  function handleDeleteEvent(e, id) {
    api
      .delete('events/'+id);
  }

  function logout() {
    api
      .get('logout')
      .then(res => {
        setLoggedIn(false)
      });
  }

  useEffect(() => {
    api
      .get('events/user/' + userId, {
        withCredentials: true
      })
      .then((res) => {
        setEvents(res.data);
        console.log(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [userId]);

  const eventsComponent = events.map((event) => 
      <li>
        <div>
          {event.title}
        </div>
        <div>
          {UTCtoDateString(event.begin_time)}
        </div>
        <div>
          {UTCtoTimeString(event.begin_time)}
        </div>
        <div>
          {UTCtoDateString(event.begin_time)}
        </div>
        <div>
          {UTCtoTimeString(event.begin_time)}
        </div>
        <div>
          <button onClick={e => handleEditEvent(e, event)}>
            Edit Event
          </button>
          <button onClick={e => handleDeleteEvent(e, event.id)}>
            Delete Event
          </button>
        </div>
        
      </li>
  )

  return (
    <>
      <main>
        <div>
          <button onClick={e => handleNewEvent(e)}>
            New Event
          </button>
          <button onClick={e => logout()}>
            Logout
          </button>
        </div>
        <div>
          <ul>
            {eventsComponent}
          </ul>
        </div>
        
      </main>

      <NewEventForm hidden={hideNewEventForm} setHidden={setHideNewEventForm} userId={userId}/>
      <EditEventForm hidden={hideEditEventForm} setHidden={setHideEditEventForm} userId={userId} event={event}/>

    </>
  );
}

export default Home;
