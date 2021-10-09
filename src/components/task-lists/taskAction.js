import { requestPending, addTaskSuccess, requestFail, fetchTaskSuccess, deleteTaskSuccess } from "./taskSlice"

import {createTask, getTaskLists, deleteTasks} from "../../apis/taskApi";

export const addTask = (newTask) => async dispatch => {
    try {
        // call add task api 
    dispatch(requestPending())
    
    
        const result = await createTask(newTask)
        console.log(result, "from action")
    

        dispatch(addTaskSuccess(result))
        result.status === "success" &&  dispatch(fetchTaskLists())
     
    } catch (error) {
        dispatch(requestFail({
            status: "error",
            message: error.message,
        }))
        
    }
    
}




// fetch all the tickets and update in the redux store 


export const fetchTaskLists = () => async dispatch => { 

    try {
        dispatch(requestPending())
        const { result } = await getTaskLists()
        
        dispatch(fetchTaskSuccess(result))

    } catch (error) {
        dispatch(requestFail({
            status: "error",
            message: error.message,
        
        })
        )
    }
    
    }


    
  // delete list from task list
export const handleOnDeleteItems = taskToDelete => async dispatch => {
      
    try {
        dispatch(requestPending())

        const result = await deleteTasks({ ids: taskToDelete })
        dispatch(deleteTaskSuccess(result))
        result.status === "success" && dispatch(fetchTaskLists())
        
      console.log(result)
        
    } catch (error) {
        dispatch(requestFail({
            status: "error",
            message: error.message,

        }))
        
    }
    //  request server to delete item from database
      
      
}
    


export const taskSwitch = async taskObj => {
    
    try {
    
    const res = await switchTask(dt)
         console.log(res)
    } catch (error) {
        dispatch(requestFail({
            status: "error",
            message: error.message,

        }))

    
}

    const markAsBadList = async _id => {
        console.log(_id)
         const dt = {
           id: _id,
           todo : false,
         }
     
         

     
       }
     
       const markAsGoodList = async _id => {
       
         const dt = {
           id : _id,
           todo : true,
         }
     
         const res = await switchTask(dt);

     
       }
     


}