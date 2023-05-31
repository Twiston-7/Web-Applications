import statusCodes from "http-status-codes";

export let projects = []; //i guess temporary, while we don't have a sqlite database

export const getAllProjects = async function(req, res) {
    res.json(projects);
}

export const addProject = async function(req, res) {
    const project = req.body;
    projects.push(project);

    res.status(statusCodes.CREATED)
        .send(`Project with name ${project.name} added.`);
}