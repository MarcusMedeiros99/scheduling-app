import {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {AiOutlineCloseSquare} from 'react-icons/ai';



function EditEventForm({hidden, setHidden, userId, event}) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div hidden={hidden} >
      <button onClick={() => setHidden(true)}>
        <AiOutlineCloseSquare/>
      </button>
      <form>
        <div>
          <label>
            Title
            <input type="text" name="eventTitle" id="eventTitle" />
          </label>
        </div>
        <div>
          Begin Time
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="Pp"/>
        </div>
        <div>
          End Time
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="Pp"/>
        </div>

        <button type="submit">
          Edit Event
        </button>
      </form>
    </div>
  )
}

export default EditEventForm;