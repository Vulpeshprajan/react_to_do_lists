
import './App.css';
import { useState } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";

import { AddTaskForm } from "./components/forms/AddTaskForm.js";
import { NotToDOList } from "./components/task-lists/NotToDOList.js";
import { TaskLists } from "./components/task-lists/TaskLists.js";
import { createTask } from "./apis/taskApi";
const hrPwk = 168
const App = () => {


  const [task, setTask] = useState([])
  const [badTask, setBadTask] = useState([])
  const [err, setErr] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState([])
  const [badTaskToDelete, setBadTaskToDelete] = useState([])


  const taskHrs = task.reduce((subttl, item) => subttl + +item.hr, 0)
  const badHrs = badTask.reduce((subttl, item) => subttl + +item.hr, 0)
  const totalHrs = taskHrs + badHrs


  const addTaskList = async (frmDt) => {

    const result = await createTask(frmDt)
    console.log(result)

    if (result._id) {



    } else {
      alert("unable to add ")

    }




  }


  const markAsBadList = i => {
    const tempTaskLists = [...task]
    const badTasks = tempTaskLists.splice(i, 1)[0];

    setBadTask([
      ...badTask, badTasks
    ])
    setTask(tempTaskLists);

  }

  const markAsGoodList = i => {
    const tempBadLists = [...badTask]
    const goodTask = tempBadLists.splice(i, 1)[0];

    setTask([
      ...task, goodTask
    ])
    setBadTask(tempBadLists)

  }

  // collect indexes of task deleted 
  const handleOnTaskClicked = e => {

    const { checked, value } = e.target

    if (checked) {
      setTaskToDelete([
        ...taskToDelete, +value

      ])
    } else {
      const filteredArg = taskToDelete.filter(item => item !== +value)
      setTaskToDelete(filteredArg);
    }

  }
  const handleOnBadTaskClicked = e => {

    const { checked, value } = e.target

    if (checked) {
      setBadTaskToDelete([
        ...badTaskToDelete, +value

      ])
    } else {
      const filteredArg = badTaskToDelete.filter(item => item !== +value)
      setBadTaskToDelete(filteredArg);
    }

  }

  // delete items from the task list only 
  const deleteFromTaskLists = () => {
    const newArg = task.filter((item, i) => !taskToDelete.includes(i));
    setTaskToDelete([])

    setTask(newArg)
  }
  // delete items from the bad task list only 
  const deleteFromBadTaskLists = () => {
    const newArg = badTask.filter((item, i) => !badTaskToDelete.includes(i));
    setBadTaskToDelete([])
    setBadTask(newArg)
  }




  // delete list from task list and bad list 
  const handleOnDeleteItems = () => {
    deleteFromTaskLists()
    deleteFromBadTaskLists()
  }


  console.log(badTask, badTaskToDelete)




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
          {err && (
            <Alert variant="danger">
              You don't have enough hr to allocated task
            </Alert>

          )}
        </Col>
      </Row>
      <AddTaskForm addTaskList={addTaskList} />
      <hr />

      <Row>
        <Col>
          <TaskLists
            task={task}
            taskHrs={taskHrs}
            markAsBadList={markAsBadList}
            handleOnTaskClicked={handleOnTaskClicked}
            taskToDelete={taskToDelete} />
        </Col>
        <Col> <NotToDOList
          badTask={badTask}
          badHrs={badHrs}
          markAsGoodList={markAsGoodList}
          handleOnBadTaskClicked={handleOnBadTaskClicked}
          badTaskToDelete={badTaskToDelete} />
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
