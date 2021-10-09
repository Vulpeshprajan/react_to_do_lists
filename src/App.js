
import './App.css';
import { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Button, Spinner } from "react-bootstrap";

import { AddTaskForm } from "./components/forms/AddTaskForm.js";
import { NotToDOList } from "./components/task-lists/NotToDOList.js";
import { TaskLists } from "./components/task-lists/TaskLists.js";
import { createTask, getTaskLists, switchTask, deleteTasks } from "./apis/taskApi";
import {useDispatch, useSelector  } from "react-redux";
import { AlertMessage } from './components/message/AlertMessage';
import { fetchTaskLists, handleOnDeleteItems } from "./components/task-lists/taskAction";
import { setTaskToDelete } from "./components/task-lists/taskSlice";




const App = () => {

  const dispatch = useDispatch()
  const { isPending, totalHrs, taskToDelete } = useSelector(state => state.task)



  

  useEffect(() => {
    // fetch all the tickets from database 
      dispatch( fetchTaskLists())
  }, [])

  
  
  


  

  



  return (

    <Container >
      <Row>
        <Col>
          <h1 className="text-center"> TO Do Lists</h1>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
        <AlertMessage/>
        </Col>
      </Row>
      <AddTaskForm />
      <hr />

      <Row>
        <Col>
        
          {isPending && ( <Spinner animation="border" variant="primary "/> )}
          
          <TaskLists/>
        </Col>
        <Col>
          <NotToDOList />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="danger" onClick={()=> dispatch(handleOnDeleteItems(taskToDelete))} > Delete
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <Alert> Your total allocated hr = {totalHrs} hr/week
          </Alert>
        </Col>
      </Row>

    </Container>

  );
}

export default App;
