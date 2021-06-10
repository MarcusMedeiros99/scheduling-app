import { useEffect, useState } from 'react';

import api from '../../api/api';
import UTCtoDateString from '../../utils/UTCtoDateString';
import UTCtoTimeString from '../../utils/UTCtoTimeString';

import NewEventForm from '../NewEventForm/NewEventForm';
import EditEventForm from '../EditEventForm/EditEventForm';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import FlashMessage from '../FlashMessage/FlashMessage';

import './home.css';

function Home({userId, setLoggedIn}) {
  const [events, setEvents] = useState([]);
  const [hideNewEventForm, setHideNewEventForm] = useState(true);
  const [hideEditEventForm, setHideEditEventForm] = useState(true);
  const [hideConfirmDelete, setHideConfirmDelete] = useState(true);
  const [hideEventsList, setHideEventsList] = useState(false);
  const [event, setEvent] = useState({});
  const [flashMessage, setFlashMessage] = useState("");
  const [flashMessageColor, setFlashMessageColor] = useState("");



  function handleNewEvent() {
    setHideNewEventForm(false);
    setHideEditEventForm(true);
    setHideEventsList(true);
  }

  function handleEditEvent(event) {
    setEvent(event);
    setHideNewEventForm(true);
    setHideEventsList(true);
    setHideEditEventForm(false);
  }

  function handleDeleteEvent(event) {
    setEvent(event);
    setHideConfirmDelete(false);
  }

  function closeNewEventForm() {
    setHideNewEventForm(true);
    setHideEventsList(false);
  }

  function closeEditEventForm() {
    setHideEditEventForm(true);
    setHideEventsList(false);
  }

  function closeConfirmDelete() {
    setHideConfirmDelete(true);
  }

  function logout() {
    api
      .get('logout')
      .then(res => {
        setLoggedIn(false)
      });
  }

  function showFlashMessage(message, color) {
    setFlashMessage(message);
    setFlashMessageColor(color);
    window.scrollTo(0,0);

    setTimeout(() => {
      setFlashMessage("");
    }, 5000);
  }

  useEffect(() => {
    api
      .get('events/user/' + userId, {
        withCredentials: true
      })
      .then((res) => {
        setEvents(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  });

  const eventsComponent = events.map((event) => 
      <li key={event.id} className="event">
        <h3>
          {event.title}
        </h3>
        <div>
          <h4>
            Begin
          </h4>
          {UTCtoDateString(event.begin_time)}
        </div>
        <div>
          {UTCtoTimeString(event.begin_time)}
        </div>
        <div>
          <h4>
            End
          </h4>
          {UTCtoDateString(event.end_time)}
        </div>
        <div>
          {UTCtoTimeString(event.end_time)}
        </div>
        <div className="buttons">
          <button onClick={() => handleEditEvent(event)}>
            Edit Event
          </button>
          <button onClick={() => handleDeleteEvent(event)} className="deleteBtn">
            Delete Event
          </button>
        </div>
        
      </li>
  )

  return (
    <>
      {
        hideEventsList ? <main></main>:
        <main className="home">
          <FlashMessage
            message={flashMessage}
            color={flashMessageColor}
          />
          <nav className="buttons">
            <button className="newBtn" onClick={e => handleNewEvent(e)}>
              New Event
            </button>
            <button className="logoutBtn" onClick={e => logout()}>
              Logout
            </button>
          </nav>
          <div className="events">
            <ul>
              {eventsComponent}
            </ul>
          </div>
        </main> 
      }
      

      <NewEventForm
        hidden={hideNewEventForm}
        userId={userId}
        close={closeNewEventForm}
        showFlashMessage={showFlashMessage}/>

      <EditEventForm
        hidden={hideEditEventForm}
        userId={userId}
        event={event}
        close={closeEditEventForm}
        showFlashMessage={showFlashMessage}/>
      
      <ConfirmDelete
        hidden={hideConfirmDelete}
        event={event}
        close={closeConfirmDelete}
        showFlashMessage={showFlashMessage}
      />
    </>
  );
}

export default Home;
