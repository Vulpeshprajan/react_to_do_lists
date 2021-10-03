import React from 'react'
import { Table, Alert } from 'react-bootstrap'

export const NotToDOList = ({ badTask,
  markAsGoodList,  handleOnBadTaskClicked, badTaskToDelete }) => {
  
  
  const badHrs = badTask.reduce((subTtl, item) => subTtl + item.hr, 0 )
  
  
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
  badTask.map((item, i) => {
    return (
      <tr key={i}>
    
      <td><input type= "checkbox"
       checked = {badTaskToDelete.includes(item._id)}
      defaultValue = {item._id}
      onChange = {handleOnBadTaskClicked}
      
      /> <label>{item.task} </label></td>
      <td>{item.hr}</td>
      <td><button onClick={() => markAsGoodList(item._id)} className="btn-sm bg-danger rounded-pill"><i className="fas fa-minus-circle"></i> Mark as TD </button></td>
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