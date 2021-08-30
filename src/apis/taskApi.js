import axios from "axios";

const rootUrl = "http://localhost:8000"
const postApi = rootUrl + "api/v1"

// post data


export const createTask = (frmDt) => {
    return new Promise((resolve, reject) => {
    axios
    .post(postApi, frmDt)
        .then(response => {
        resolve(response.data)
      
    })
    .catch(error => {
        resolve(false)
    })
})
}


// fetch the data
const getTaskLists = () => {
    return Promise(async resolve => {
        try {
            const result = await 
        } catch (error) {
            
        }
    })


}