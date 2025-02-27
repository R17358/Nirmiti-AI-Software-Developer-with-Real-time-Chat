import {
    CREATE_PROJECT_REQUEST,
    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_FAIL,
    GET_ALL_PROJECTS_REQUEST,
    GET_ALL_PROJECTS_SUCCESS,
    GET_ALL_PROJECTS_FAIL,
    GET_ALL_USERS_IN_PROJECT_REQUEST,
    GET_ALL_USERS_IN_PROJECT_SUCCESS,
    GET_ALL_USERS_IN_PROJECT_FAIL,
    ADD_USER_TO_PROJECT_REQUEST,
    ADD_USER_TO_PROJECT_SUCCESS,
    ADD_USER_TO_PROJECT_FAIL
} from "../constants/projectConstant"
import axios from "../api/axios"
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const createProject = (projectData)=> async(dispatch) =>{

    try {
        
        dispatch({type:CREATE_PROJECT_REQUEST});

        const config = {
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials:true,
        };
        const {data} = await axios.post(`/project/new`, projectData, config);
        //localStorage.setItem("projectName",data.project.)
        dispatch({type:CREATE_PROJECT_SUCCESS, payload: data.project});
        toast.success("Project Created Successfully ");
    } 
    catch (error) {
        dispatch({type:CREATE_PROJECT_FAIL, payload:error.response.data.message});
        toast.error(error.response.data.message || "Project Not Created");
    }

}

export const getAllProjects = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_PROJECTS_REQUEST });
  
      const token = localStorage.getItem("token");
  
      if (!token || token.split('.').length !== 3) {
        console.log("Invalid token found, clearing...");
        localStorage.removeItem("token");
        return;
      }
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        withCredentials: true,
      };
  
      const { data } = await axios.get(`/project/all`, config);
      dispatch({ type: GET_ALL_PROJECTS_SUCCESS, payload: data.projects });
    } catch (error) {
        
      const errorMessage = error.response?.data?.message || "Projects Not Found";
      dispatch({ type: GET_ALL_PROJECTS_FAIL, payload: errorMessage });
      toast.error(errorMessage);
    }
  };
  

export const getAllUsersInProject = (projectId) => async(dispatch)=>{

    try{
        dispatch({type: GET_ALL_USERS_IN_PROJECT_REQUEST});
        
        const config = {
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
        };

        const {data} = await axios.get(`/project/users/${projectId}`, config);

        dispatch({type:GET_ALL_USERS_IN_PROJECT_SUCCESS, payload: data.users});
        // return data;

    }
    catch(error)
    {
        dispatch({type:GET_ALL_USERS_IN_PROJECT_FAIL, payload:error.response.data.message});
        toast.error(error.response.data.message || "Users Not Found");
    }
}

export const addUserToProject = (projectId, userArray) => async(dispatch) => {
  try {
      dispatch({ type: ADD_USER_TO_PROJECT_REQUEST });

      const config = {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
      };

      const { data } = await axios.post(`/project/adduser/${projectId}`, { users: userArray }, config);

      console.log("Response received:", data);

      dispatch({ type: ADD_USER_TO_PROJECT_SUCCESS, payload: data.users });
      toast.success("User Added Successfully");
  } catch (error) {
      dispatch({ type: ADD_USER_TO_PROJECT_FAIL, payload: error.response?.data?.message || "User Not Added" });
      toast.error(error.response?.data?.message || "User Not Added");
  }
};
