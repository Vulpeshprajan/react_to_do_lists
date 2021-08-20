import React from 'react'
import { Table } from 'react-bootstrap'

export const TaskLists = ({task}) => {
  console.log(task)
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
    
      <td><input type= "checkbox"/> <label>{item.task} </label></td>
      <td>{item.hr}</td>
      <td><button className="btn-sm bg-danger rounded-pill"><i className="fas fa-minus-circle"></i> Mark as NTD </button></td>
     
    </tr>
    )



  })



}
        



    
   
  </tbody>
</Table>
        </div>
    )
}
