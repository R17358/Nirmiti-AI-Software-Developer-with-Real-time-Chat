import express from 'express';
import { createProject, getMyAllProjects, getAllProjects, getAllProjectsByUserId, getProjectByProjectId, addUsersToProject, usersInProject} from '../controllers/projectController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js';
import { updateFileTree } from '../controllers/projectController.js';

const router = express.Router();

router.route('/project/new').post(isAuthenticatedUser, createProject);
router.route('/project/me').get(isAuthenticatedUser, getMyAllProjects);
router.route('/project/all').get(isAuthenticatedUser, getAllProjects);
router.route('/project/userId/:userId').get(isAuthenticatedUser,getAllProjectsByUserId);
router.route('/project/projectId/:projectId').get(isAuthenticatedUser, getProjectByProjectId);
router.route('/project/adduser/:projectId').post(isAuthenticatedUser, addUsersToProject );
router.route('/project/users/:projectId').get(isAuthenticatedUser, usersInProject);
router.route('/update-file-tree').post(isAuthenticatedUser, updateFileTree);

export default router;