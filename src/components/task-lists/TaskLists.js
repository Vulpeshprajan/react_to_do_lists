import React from 'react'
import { Table, Alert } from 'react-bootstrap'

import { useSelector, useDispatch } from "react-redux";
import { setTaskToDelete } from "./taskSlice";


export const TaskLists = ({ markAsBadList, taskHrs}) => {

  const {taskLists, taskToDelete} = useSelector(state =>  state.task )

  const dispatch = useDispatch()


    return (
        <div>
            <h2> Task Lists</h2>
          <Table striped bordered hover variant="dark">
  
  <thead>
    <tr>
      <td>Tasks</td>
      <td>Hours</td>
      <td>Actions</td>
      
    </tr>
    </thead>
    <tbody>


{
  taskLists.map((item, i) => {
    return (
      <tr key={i}>
    
      <td><input type= "checkbox" 
      checked = {taskToDelete.includes(item._id)}
      defaultValue = {item._id}
      onChange = {e => dispatch(setTaskToDelete(e.target))}
      /> <label>{item.task} </label></td>
      <td>{item.hr}</td>
      <td><button onClick={() => markAsBadList(item._id)} className="btn-sm bg-danger rounded-pill"><i className="fas fa-minus-circle"></i> Mark as NTD </button></td>
     
    </tr>
    )
  })
}
  </tbody>
</Table>
<Alert variant ="success"> You have save = {taskHrs} hr/week
         </Alert>
        </div>
    )
}
