import React from 'react';
import Aux from '../../hoc/aux';

const settingsModal = (props) => {

  let removeAlert;
  let button = <Aux> 
    <button type="button" className="btn btn-warning mr-3" data-dismiss="modal">Cancel</button>
    <button onClick={ props.onClick } type="submit" className="btn btn-danger">Remove</button>
  </Aux> 

  if (props.removeAlert === 'typingError') {
    removeAlert =  <div className='text-danger mb-3'>  You did not type 'REMOVE' correctly. Try again. </div>
  }

  if (props.removeAlert === 'success') {
    removeAlert = <div className='text-success mb-3'> User removed </div>;
    button =  <button type="button" onClick={props.closeModal} className="btn btn-secondary" data-dismiss="modal">OK</button>
  }




return (
<Aux> 
      <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#delete">
      Remove
    </button>
    
    <div className="modal fade" id="delete" data-backdrop="static" tabIndex="-1" aria-labelledby="deleteLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{ `Remove ${ props.name } ?` }</h5>
            <button type="button" onClick={props.closeModal} className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <p> Are you sure you want to remove <span className='font-weight-bold'>{ props.name }</span> from the dashboard ? If so, type REMOVE :  </p>
          <form>
            <div className="form-group">
              <input onChange={ props.onChange }  value={ props.value } className="form-control"></input>
            </div>
           {removeAlert} 
            {button}
          </form>
          </div>
        </div>
      </div>
    </div>
    </Aux>
)

}

export default settingsModal;