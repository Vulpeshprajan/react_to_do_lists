import React from 'react'
import { Table, Alert, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { taskSwitcher } from './taskAction';
import { setTaskToDelete } from './taskSlice';

export const NotToDOList = () => {
  
  const { badTaskLists, taskToDelete } = useSelector(state => state.task)
  
  const dispatch = useDispatch()
  const badHrs = badTaskLists.reduce((subTtl, item) => subTtl + item.hr, 0 )
  
  
    return (
       <div>
            <h2> No-To-Do Lists  </h2>
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
  badTaskLists.map((item, i) => {
    return (
      <tr key={i}>
    
      <td><input type= "checkbox"
       checked = {taskToDelete.includes(item._id)}
      defaultValue = {item._id}
      onChange = {e => dispatch(setTaskToDelete(e.target))}
      
      /> <label>{item.task} </label></td>
      <td>{item.hr}</td>
        <td>
          <Button onClick={() => dispatch(taskSwitcher({id: item._id, todo: true }))}
            className="btn-sm bg-danger rounded-pill">
            <i className="fas fa-minus-circle">
            </i> Mark as TD </Button></td>
    </tr>
    )
  })
}
  </tbody>
</Table>
<Alert variant ="warning"> You have save = {badHrs} hr/week
         </Alert>
        </div>
        )
}