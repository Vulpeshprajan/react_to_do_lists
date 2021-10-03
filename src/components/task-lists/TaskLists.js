import React from 'react'
import { Table, Alert } from 'react-bootstrap'


export const TaskLists = ({task,markAsBadList, taskHrs , handleOnTaskClicked, taskToDelete}) => {
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
  task.map((item, i) => {
    return (
      <tr key={i}>
    
      <td><input type= "checkbox" 
      checked = {taskToDelete.includes(item._id)}
      defaultValue = {item._id}
      onChange = {handleOnTaskClicked}
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
