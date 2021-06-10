import './flashMessage.css'

function FlashMessage({message, color}) {
  if (!message) {
    return <></>
  }
  return (<div className={`flashMessage ${color}`}>
            {message}
          </div>
  );
}

export default FlashMessage;