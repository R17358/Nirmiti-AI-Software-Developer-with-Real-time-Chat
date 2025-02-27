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
    ADD_USER_TO_PROJECT_FAIL,

} from "../constants/projectConstant"

const initialState = {
    project: {name: localStorage.getItem("projectName") || '',
    },
    projects:[],
    users:[],
    loading: false,
    error: null
  };

export const CreateProjectReducer = (state = initialState, action)=>{

    switch(action.type)
    {
        case CREATE_PROJECT_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case CREATE_PROJECT_SUCCESS:
            return{
                ...state,
                loading: false,
                project: action.payload,
            }
        case CREATE_PROJECT_FAIL:
            return{
                ...state,
                loading: false,
                project: null,
                error: action.payload,
            }

        case GET_ALL_PROJECTS_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case GET_ALL_PROJECTS_SUCCESS:
            return{
                ...state,
                loading: false,
                projects: action.payload
            }
        case GET_ALL_PROJECTS_FAIL:
            return{
                ...state,
                loading: false,
                projects: [],
                error: action.payload,
            }
        
        case GET_ALL_USERS_IN_PROJECT_REQUEST: 
            return {
                ...state,
                loading: true,
            }

        case GET_ALL_USERS_IN_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            }
        
        case GET_ALL_USERS_IN_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload,
            }

        case ADD_USER_TO_PROJECT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        
        case ADD_USER_TO_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        
        case ADD_USER_TO_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}
