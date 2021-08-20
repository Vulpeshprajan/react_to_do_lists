
import './App.css';
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import {AddTaskForm  } from "./components/forms/AddTaskForm.js";
import {NotToDOList  } from "./components/task-lists/NotToDOList.js";
import {TaskLists  } from "./components/task-lists/TaskLists.js";

const  App = () =>  {

  
const [task, setTask] = useState([])

const addTaskList = frmDt => {
  setTask([
    ...task,
    frmDt
  ])

}

  return (
     <Container >
       <Row>
         <Col>
          <h1 className= "text-center"> TO Do Lists</h1>
         </Col>
       </Row>
       <hr />
       <AddTaskForm addTaskList = {addTaskList}/>
       <hr />
       
       <Row>
         <Col> 
          <TaskLists task= {task}  />
         </Col>
         <Col> <NotToDOList/>
         </Col>
       </Row>
     </Container>

  );
}

export default App;
