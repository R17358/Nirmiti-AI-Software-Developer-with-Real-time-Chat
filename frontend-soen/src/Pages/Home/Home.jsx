import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './Home.css'
import { createProject, getAllProjects } from '../../actions/projectAction'

function Home() {

    const { isAuthenticated, user} = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
        
    }, [isAuthenticated, navigate])

    useEffect(()=>{
        dispatch(getAllProjects());
    }, [dispatch]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [projectType, setProjectType] = useState('');
    const [projectDeadline, setProjectDeadline] = useState('');
    const [budget, setBudget] = useState();
    const [projectImage, setProjectImage ] = useState({}); 

    const {projects} = useSelector((state)=>state.projects);
    
    const createProjectFun = (e) => {
        e.preventDefault();
        // console.log('Project Created');
        // console.log(user.name);
        // console.log(user.email);
        const projectData = {projectName, projectDesc, projectType, projectDeadline, budget, projectImage};

        dispatch(createProject(projectData));

        setProjectName("")
        setProjectDesc("")
        setProjectType("")
        setProjectDeadline("")
        setBudget();
        setProjectImage({});
        
    }

    const goToProject = (project) => {
        localStorage.setItem("selectedProject", JSON.stringify(project)); 
        console.log(project);
        navigate(`/chat`);      
    };
    
    return (
        <div className='home'>
            <div className="new-project">
                <button type="button" onClick={()=>{setIsModalOpen(!isModalOpen)}}>New Project</button>
            </div>

            <div className="fetched-project-list">
                {
                    projects && projects.map((project)=>(
                        //category, name, _id, users, projectImage, description
                       
                        <div key ={project._id} className="project-item" onClick={()=>goToProject(project)}>
                           <div className="left">
                                <i className="bx bx-user-plus" style={{ color: '#110f0f', fontSize: 'x-large' }}></i>
                                <h2>{project?.users.length}</h2>
                             </div>
                            <div className="right">
                                <div className="project-name">
                                    <h2>{project?.name}</h2>
                                </div>
                                <div className="project-category">
                                    <h3>{project?.category}</h3>
                                </div>
                                {/* <div className="project-description">
                                    <h3>{project?.description}</h3>
                                </div> */}
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={`project-form ${isModalOpen ? 'open' : ''}`}>
                <div className="project-content">
                    <h3>Create New Project </h3>
                    <form onSubmit={createProjectFun}>
                    <div className="form-group">
                        <label htmlFor="projectName">Project Name <span style={{color:"red"}}>*</span></label>
                        <input type="text" id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Enter Project Name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="projectDesc">Project Description</label>
                        <textarea id="projectDesc" value={projectDesc} onChange={(e) => setProjectDesc(e.target.value)} placeholder="Enter Project Description" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="projectType">Project Category</label>
                        <select id="projectType" value={projectType} onChange={(e) => setProjectType(e.target.value)}>
                            <option value="">Select a Category</option> {/* Ensure a default empty value */}
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile Development">Mobile Development</option>
                            <option value="Desktop Development">Desktop Development</option>
                            <option value="Game Development">Game Development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Cyber Security">Cyber Security</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="projectDeadline">Project Deadline</label>
                        <input type="date" id="projectDeadline" value={projectDeadline} onChange={(e) => setProjectDeadline(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="projectBudget">Project Budget</label>
                        <input type="number" id="projectBudget" value={budget} onChange={(e) => setBudget(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="projectImage">Project Image</label>
                        <input type="file" id="projectImage" onChange={(e) => setProjectImage(e.target.files[0])} />
                    </div>

                    <div className="form-group">
                        <button type="submit">Create Project</button>
                    </div>
                </form>

                </div>
            </div>
            
        </div>
    )
}

export default Home