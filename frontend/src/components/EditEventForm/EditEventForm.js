import {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {AiOutlineClose} from 'react-icons/ai';

import api from '../../api/api';

import './editEventForm.css';

function EditEventForm({hidden, userId, event, close, showFlashMessage}) {
  const [beginTime, setBeginTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [title, setTitle] = useState(event.title);

  useEffect(() => {
    if (!hidden) {
      setBeginTime(new Date(event.begin_time));
      setEndTime(new Date(event.end_time));
    }
  }, [hidden, event]);

  function handleSubmit(e) {
    e.preventDefault();

    api
      .put('/events', {
        title,
        id: event.id,
        begin_time: beginTime, 
        end_time: endTime,
        user_id: userId,
      })
      .then(res => {
        close();
        showFlashMessage("Event edited", "green");
      })
  }

  return (
    hidden ? <div></div>: 
    <div className="editEventForm">
      <button className="closeBtn" onClick={() => close()}>
        <AiOutlineClose size={40}/>
      </button>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>
            <h3>
              Title
            </h3>
            <input defaultValue={event.title} type="text" name="eventTitle" id="eventTitle" onChange={e => setTitle(e.target.value)}/>
          </label>
        </div>
        <div>
          <h3>
            Begin Time
          </h3>
          <DatePicker selected={beginTime} onChange={(time) => setBeginTime(time)} showTimeSelect dateFormat="Pp"/>
        </div>
        <div>
          <h3>
            End Time
          </h3>
          <DatePicker selected={endTime} onChange={(time) => setEndTime(time)} showTimeSelect dateFormat="Pp"/>
        </div>

        <button type="submit">
          Edit Event
        </button>
      </form>
    </div>
  )
}

export default EditEventForm;