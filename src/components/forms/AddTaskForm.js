

import React, { useState } from 'react'
import {useDispatch, useSelector  } from "react-redux";
import { Col, Form, Row, Button, Container } from 'react-bootstrap'
import {addTask} from "../task-lists/taskAction";

const initialState = {
  task: "Coding",
  hr: 10

}


export const AddTaskForm = () => {

  const dispatch = useDispatch()
  const {totalHrs} = useSelector(state => state.task)
  
  const [frmData, setFrmData] = useState(initialState)


  const handleOnChange = e => {
    const { name, value } = e.target;

    setFrmData({
      ...frmData,
      [name]: value,
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (totalHrs + +frmData.hr > 168) {
      return alert("Not enough time to add more task")
    }
      
    dispatch(addTask(frmData))
    // addTaskList(frmData);
  }




  return (
    <Container>
      <Form onSubmit={handleOnSubmit}  >
        <Row>
          <Col>
            <Form.Control
              name="task"
              onChange={handleOnChange}
              value={frmData.task}
              maxLength="30"
              placeholder="Please add task" />
          </Col>
          <Col>
            <Form.Control
              name="hr"
              value={frmData.hr}
              onChange={handleOnChange}
              type="number"

              placeholder="hours" />
          </Col>
          <Col>
            <Button type="submit" variant="primary"><i className="fas fa-plus-circle"></i></Button>
          </Col>
        </Row>
      </Form>
    </Container>

  )
}
