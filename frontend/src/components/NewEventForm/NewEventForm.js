import {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {AiOutlineClose} from 'react-icons/ai';

import api from '../../api/api';

import './newEventForm.css';

function NewEventForm({hidden, userId, close, showFlashMessage}) {
  const [beginTime, setBeginTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [title, setTitle] = useState("");


  function handleSubmit(e) {
    e.preventDefault();

    api
      .post('/events', {
        title,
        begin_time: beginTime, 
        end_time: endTime,
        user_id: userId
      })
      .then(res => {
        showFlashMessage("Event created", "green");
        close();
      })
  }

  return (
    hidden ? <div></div> :
    <div className="newEventForm">
      <button onClick={() => close()} className="closeBtn">
        <AiOutlineClose size={40}/>
      </button>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>
            Title
            <input type="text" name="eventTitle" id="eventTitle" onChange={e => setTitle(e.target.value)}/>
          </label>
        </div>
        <div>
          Begin Time
          <DatePicker selected={beginTime} onChange={(date) => setBeginTime(date)} showTimeSelect dateFormat="Pp"/>
        </div>
        <div>
          End Time
          <DatePicker selected={endTime} onChange={(date) => setEndTime(date)} showTimeSelect dateFormat="Pp"/>
        </div>

        <button type="submit">
          Create Event
        </button>
      </form>
    </div>
  )
}

export default NewEventForm;