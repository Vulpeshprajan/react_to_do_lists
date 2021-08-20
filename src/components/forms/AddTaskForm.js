

import React ,{useState} from 'react'
import { Col, Form, Row ,Button, Container} from 'react-bootstrap'

  const initialState ={
task :"",
hr: 0

  }


export const AddTaskForm = ({addTaskList}) => {



    const [frmData, setFrmData] = useState(initialState)


    const handleOnChange = e => {
      const {name, value} = e.target;
      
      setFrmData ({
        ...frmData,
        [name]: value,
      })
      }

       const handleOnSubmit = (e) => {
       e.preventDefault();
        addTaskList(frmData);
       }
       
   


    return (
        <Container>
       <Form   onSubmit = {handleOnSubmit}  >
  <Row>
    <Col>
      <Form.Control 
      name = "task" 
      onChange = {handleOnChange}
      maxLength = "30"
      placeholder="Please add task" />
    </Col>
    <Col>
      <Form.Control   
      name = "hr"
      onChange = {handleOnChange} 
      type = "number"

      placeholder="hours" />
    </Col>
    <Col>
     <Button type = "submit" variant="primary"><i className="fas fa-plus-circle"></i></Button>
    </Col>
  </Row>
</Form>
</Container>

    )
}
