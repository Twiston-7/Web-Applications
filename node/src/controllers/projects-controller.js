import statusCodes from "http-status-codes"; // Importing the "http-status-codes" library
import * as db from "../database/helpers/projects-database-helper.js"

// Function to get all projects
export const getAllProjects = async (req, res) => {
    res.json(db.getProjects());
}

export const getProgrammerFromProjectId = async (req, res) => {
    res.json(db.getProgrammerFromProject(req.params.id));
}

export const getArticleFromProjectId = async (req, res) => {
    res.json(db.getArticleFromProject(req.params.id));
}


// Function to add a project
export const addProject = async function (req, res) {
    try {
        const project = req.body;

        if (!project || Object.keys(project).length === 0) {
            // Return an error response if the project object is empty
            res
                .status(statusCodes.BAD_REQUEST)
                .send("Empty request body. Please provide project details.");
            return;
        }

        if (!project.name) {
            // Return an error response if the project name is empty
            res
                .status(statusCodes.BAD_REQUEST)
                .send("Empty project name. Please provide project name.");
            return;
        }
        if (!project.languages || project.languages.length === 0) {
            // Return an error response if no languages are provided
            res
                .status(statusCodes.BAD_REQUEST)
                .send("Empty languages. Please provide at least one language.");
            return;
        }
        if (!project.skills || project.skills.length === 0) {
            // Return an error response if no skills are provided
            res
                .status(statusCodes.BAD_REQUEST)
                .send("Empty skills. Please provide at least one skill.");
            return;
        }
        if (!project.programmerID) {
            res
                .status(statusCodes.BAD_REQUEST)
                .send("Empty programmer ID. Please provide an author id. ");
            return;
        }

        const returnValue = db.addProject(project);

        res
            .status(statusCodes.CREATED)
            .send(`Project with id ${returnValue} added.`);
    } catch (error) {
        console.error(error);
        res
            .status(statusCodes.INTERNAL_SERVER_ERROR)
            .send("An error occurred while creating the project: " + error.message);
    }
};

// Function to delete a project
export const deleteProject = async function (req, res) {
    const projectId = req.params.id;

    const result = db.deleteProject(projectId);

    if (result.changes === 0) {
        // Return an error response if the project was not found
        res
            .status(statusCodes.NOT_FOUND)
            .send(`Project with ID ${projectId} not found.`);
    } else {
        res
            .status(statusCodes.OK)
            .send(`Project with ID ${projectId} deleted.`);
    }
};

// Function to update a project
export const updateProject = async function (req, res) {
    const projectId = req.params.id;
    const updatedProject = req.body;

    if (!updatedProject || Object.keys(updatedProject).length === 0) {
        // Return an error response if the request body is empty
        res
            .status(statusCodes.BAD_REQUEST)
            .send("Empty request body. Please provide project details.");
        return;
    }

    try {
        db.updateProject(projectId, updatedProject);

        res
            .status(statusCodes.OK)
            .send(`Project with ID ${projectId} updated.`);
    } catch (error) {
        console.error(error);
        res
            .status(statusCodes.INTERNAL_SERVER_ERROR)
            .send("An error occurred while updating the project: " + error.message);
    }
};
