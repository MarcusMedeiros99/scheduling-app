
import api from '../../api/api';

import './confirmDelete.css'

function ConfirmDelete({hidden, event, close, showFlashMessage}) {
  function handleConfirm() {
    api
      .delete('events/'+event.id)
      .then(res => {
        showFlashMessage("Event deleted", "red");
        close();
      })
  }

  function handleCancel() {
    close();
  }

  return (
    hidden ? <></> :
    
    <div className="confirmDelete">
      <h3>Are you sure you want to delete this?</h3>
      <div className="buttons">
        <button onClick={() => handleConfirm()}>Yes</button>
        <button onClick={() => handleCancel()}>Cancel</button>
      </div>
    </div>
  )
}

export default ConfirmDelete;