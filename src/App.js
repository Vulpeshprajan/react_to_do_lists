
import './App.css';
import { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Button, Spinner } from "react-bootstrap";

import { AddTaskForm } from "./components/forms/AddTaskForm.js";
import { NotToDOList } from "./components/task-lists/NotToDOList.js";
import { TaskLists } from "./components/task-lists/TaskLists.js";
import { createTask, getTaskLists, switchTask, deleteTasks } from "./apis/taskApi";

const hrPWk = 168
const initialResponse = {
  status: "",
  message: ""

}

const App = () => {


  const [task, setTask] = useState([])
  const [badTask, setBadTask] = useState([])
  const [err, setErr] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState([])
  // const [badTaskToDelete, setBadTaskToDelete] = useState([])

  const [apiResponse , setApiResponse] = useState(initialResponse)


  const taskHrs = task.reduce((subttl, item) => subttl + +item.hr, 0)
  const badHrs = badTask.reduce((subttl, item) => subttl + +item.hr, 0)
  const totalHrs = taskHrs + badHrs


  useEffect(() => {
    // fetch all the tickets from database
    const fetchingAllTask = async () => {
      const {result} =  await getTaskLists()
      setTask(result)
    }
    fetchingAllTask()

  }, [])

  const fetchAllTasks = async() => {
    const {result} = await getTaskLists()
     
      setTask(result)

  }


  const addTaskList = async (frmDt) => {

    if (hrPWk < totalHrs + +frmDt.hr) {
      setApiResponse({
        status: "error",
        message: "No enough hours left",
  
    
      }); return
    }

      
    const result = await createTask(frmDt)
    if (result._id) {
      fetchAllTasks()
      setApiResponse({
        status: "success",
        message: "New task has been added successfully ",
      })
    } else {
      setApiResponse({
        status: "error",
        message: "No enough hours left",
      })
    
      };

    




    
  }




  const markAsBadList = async _id => {
   console.log(_id)
    const dt = {
      id: _id,
      todo : false,
    }

    const res = await switchTask(dt)
    console.log(res)
    res.result._id && fetchAllTasks()





  }

  const markAsGoodList = async _id => {
  
    const dt = {
      id : _id,
      todo : true,
    }

    const res = await switchTask(dt);
   
      res.result._id && fetchAllTasks()
    


  }

  // collect indexes of task deleted 
  const handleOnTaskClicked = e => {

    const { checked, value } = e.target

    if (checked) {
      setTaskToDelete([...taskToDelete, value ])
    } else {
      const filteredArg = taskToDelete.filter(item => item !== value)
      setTaskToDelete(filteredArg);
    }

  }
 


  // delete list from task list
  const handleOnDeleteItems = async () => {
  //  request server to delete item from database
    
    const { deletedCount } = await deleteTasks({ ids: taskToDelete })
    console.log(taskToDelete)
    deletedCount > 0 && fetchAllTasks() && setApiResponse({
      status: "danger",
      message: "Selecterd task has been deleted successfully",
    })
    
  

  }


// task list only
const taskListsOnly  = task.filter(item => item.todo)


// bad list only 
const badTaskListsOnly  = task.filter (item => !item.todo)

  



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
          {apiResponse.message && (
            <Alert variant={apiResponse.status ==="success"? "success" : "danger"}>
              {apiResponse.message}
            </Alert>

          )}
        </Col>
      </Row>
      <AddTaskForm addTaskList={addTaskList} />
      <hr />

      <Row>
        <Col>
        
          {!task.length && !badTask.length && ( <Spinner animation="border" variant="primary "/> )}
          
          <TaskLists
            task={taskListsOnly}
            taskHrs={taskHrs}
            markAsBadList={markAsBadList}
            handleOnTaskClicked={handleOnTaskClicked}
            taskToDelete={taskToDelete} />
        </Col>
        <Col> <NotToDOList
          badTask={badTaskListsOnly}
          badHrs={badHrs}
          markAsGoodList={markAsGoodList}
          handleOnBadTaskClicked={handleOnTaskClicked}
          badTaskToDelete={taskToDelete} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="danger" onClick={handleOnDeleteItems} > Delete
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
