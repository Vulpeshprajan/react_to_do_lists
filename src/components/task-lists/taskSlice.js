import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    taskLists: [],
    badTaskLists : [],
    taskToDelete: [],
    status: "",
    message: "",
    isPending: false,
    totalHrs: 0,

}
const taskSlice = createSlice({
    name: "taskList",
    initialState,
    reducers: {

            // update state when is pending 
        requestPending: state => {
            state.isPending = true;   
    },
        // update state when response is success 
        addTaskSuccess: (state, { payload }) => {
            console.log(payload, "from slice");
            state.status = payload.status;
            state.message = payload.message;
            state.isPending = false;
        
        },

        // fetch all task and update 
        fetchTaskSuccess: (state, { payload }) => {
            state.isPending = false;

            state.totalHrs = payload.reduce((subttl, item) => subttl + +item.hr, 0);
            const taskListsOnly = payload.filter(item => item.todo);
            state.taskLists = taskListsOnly;

        // bad list only 
            const badTaskListsOnly = payload.filter(item => !item.todo);
        state.badTaskLists = badTaskListsOnly;

          

        },
      

        setTaskToDelete: (state, { payload }) => {
            console.log(payload, "from slice")
            const { checked, value } = payload;

            if (checked) {
                state.taskToDelete = [...state.taskToDelete, value]
        
            } else {
                const filteredArg = state.taskToDelete.filter(item => item !== value)
                state.taskToDelete = filteredArg
            }
        },

        deleteTaskSuccess: (state, { payload }) => {
            state.isPending = false;
            state.status = payload.status;
            state.message = payload.message;
        },
    
    
        

        // update state when response is fail 
        requestFail: (state, {payload}) => {
            state.isPending = false
            state.status = payload.status;
            state.message = payload.message;
         }
        

    }


})


const { reducer, actions } = taskSlice

export const { requestPending, addTaskSuccess, requestFail, fetchTaskSuccess,setTaskToDelete, deleteTaskSuccess} = actions

export default reducer;