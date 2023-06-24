import statusCodes, { StatusCodes } from "http-status-codes"; // Importing the 'http-status-codes' library
import Database from "better-sqlite3"; // Importing the 'better-sqlite3' library
import { fileURLToPath } from "url"; // Importing the 'url' module
import path from "path"; // Importing the 'path' module

// Getting the current file name and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constructing the path to the database file
const databasePath = path.join(__dirname, "../database/db/data.sqlite");

// Creating a new instance of the database
const db = new Database(databasePath);

// Function to get all projects
export const getAllProjects = async function (req, res) {
    const getAllProjectsQuery = `
        SELECT
            projects.id,
            projects.name,
            GROUP_CONCAT(DISTINCT languages.name) AS languages,
            GROUP_CONCAT(DISTINCT skills.name) AS skills
        FROM
            projects
        LEFT JOIN
            project_languages ON projects.id = project_languages.project_id
        LEFT JOIN
            languages ON project_languages.language_id = languages.id
        LEFT JOIN
            project_skills ON projects.id = project_skills.project_id
        LEFT JOIN
            skills ON project_skills.skill_id = skills.id
        GROUP BY
            projects.id, projects.name
        `;

    const projects = db.prepare(getAllProjectsQuery).all();
    res.json(projects);
};

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
                .status(StatusCodes.BAD_REQUEST)
                .send("Empty project name. Please provide project name.");
            return;
        }
        if (!project.languages || project.languages.length === 0) {
            // Return an error response if no languages are provided
            res
                .status(StatusCodes.BAD_REQUEST)
                .send("Empty languages. Please provide at least one language.");
            return;
        }
        if (!project.skills || project.skills.length === 0) {
            // Return an error response if no skills are provided
            res
                .status(StatusCodes.BAD_REQUEST)
                .send("Empty skills. Please provide at least one skill.");
            return;
        }

        db.transaction(() => {
            // Insert the project into the 'projects' table
            const insertProjectQuery = `
                INSERT INTO projects (name)
                VALUES (?)
            `;
            const insertProject = db.prepare(insertProjectQuery);
            const projectResult = insertProject.run(project.name);
            const projectId = projectResult.lastInsertRowid;

            // Insert languages and their associations with the project
            const insertLanguageQuery = `
                INSERT INTO languages (name)
                VALUES (?)
            `;
            const insertProjectLanguageQuery = `
                INSERT INTO project_languages (project_id, language_id)
                VALUES (?, ?)
            `;
            const insertLanguage = db.prepare(insertLanguageQuery);
            const insertProjectLanguage = db.prepare(insertProjectLanguageQuery);
            project.languages.forEach((language) => {
                const languageResult = insertLanguage.run(language);
                const languageId = languageResult.lastInsertRowid;
                insertProjectLanguage.run(projectId, languageId);
            });

            // Insert skills and their associations with the project
            const insertSkillQuery = `
                INSERT INTO skills (name)
                VALUES (?)
            `;
            const insertProjectSkillQuery = `
                INSERT INTO project_skills (project_id, skill_id)
                VALUES (?, ?)
            `;
            const insertSkill = db.prepare(insertSkillQuery);
            const insertProjectSkill = db.prepare(insertProjectSkillQuery);
            project.skills.forEach((skill) => {
                const skillResult = insertSkill.run(skill);
                const skillId = skillResult.lastInsertRowid;
                insertProjectSkill.run(projectId, skillId);
            });
        })();

        res
            .status(statusCodes.CREATED)
            .send(`Project with name ${project.name} added.`);
    } catch (error) {
        console.error(error);
        res
            .status(statusCodes.INTERNAL_SERVER_ERROR)
            .send("An error occurred while updating the project: " + error.message);
    }
};

// Function to delete a project
export const deleteProject = async function (req, res) {
    const projectId = req.params.id;

    const deleteProjectQuery = `
        DELETE FROM projects
        WHERE id = ?
    `;

    const deleteProject = db.prepare(deleteProjectQuery);
    const result = deleteProject.run(projectId);

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
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            // Return an error response if the request body is empty
            res
                .status(statusCodes.BAD_REQUEST)
                .send("Empty request body. Please provide project details.");
            return;
        }

        const projectId = req.params.id;
        const updatedProject = req.body;

        const updateProjectQuery = `
            UPDATE projects
            SET name = ?
            WHERE id = ?
        `;
        const updateLanguageQuery = `
            INSERT OR IGNORE INTO languages (name)
            VALUES (?)
        `;
        const updateSkillQuery = `
            INSERT OR IGNORE INTO skills (name)
            VALUES (?)
        `;
        const updateProjectLanguageQuery = `
            INSERT INTO project_languages (project_id, language_id)
            VALUES (?, ?)
            ON CONFLICT (project_id, language_id) DO NOTHING
        `;
        const updateProjectSkillQuery = `
            INSERT INTO project_skills (project_id, skill_id)
            VALUES (?, ?)
            ON CONFLICT (project_id, skill_id) DO NOTHING
        `;
        const deleteProjectSkillQuery = `
            DELETE FROM project_skills
            WHERE project_id = ?
        `;
        const deleteProjectLanguagesQuery = `
            DELETE FROM project_languages
            WHERE project_id = ?
        `;

        const { name, languages, skills } = updatedProject;

        const updateProject = db.prepare(updateProjectQuery);
        const updateLanguage = db.prepare(updateLanguageQuery);
        const updateSkill = db.prepare(updateSkillQuery);
        const updateProjectLanguage = db.prepare(updateProjectLanguageQuery);
        const updateProjectSkill = db.prepare(updateProjectSkillQuery);
        const deleteProjectSkill = db.prepare(deleteProjectSkillQuery);
        const deleteProjectLanguages = db.prepare(deleteProjectLanguagesQuery);

        db.transaction(() => {
            // Update the project name
            updateProject.run(name, projectId);

            if (skills) {
                // Delete existing project skills
                deleteProjectSkill.run(projectId);
            }

            skills.forEach((skill) => {
                const existingSkill = db.prepare('SELECT id FROM skills WHERE name = ?').get(skill);
                if (existingSkill) {
                    // If the skill already exists, associate it with the project
                    updateProjectSkill.run(projectId, existingSkill.id);
                } else {
                    // If the skill doesn't exist, insert it and associate it with the project
                    const result = updateSkill.run(skill);
                    updateProjectSkill.run(projectId, result.lastInsertRowid);
                }
            });

            if (languages) {
                // Delete existing project languages
                deleteProjectLanguages.run(projectId);
            }

            languages.forEach((language) => {
                const existingLanguage = db.prepare('SELECT id FROM languages WHERE name = ?').get(language);
                if (existingLanguage) {
                    // If the language already exists, associate it with the project
                    updateProjectLanguage.run(projectId, existingLanguage.id);
                } else {
                    // If the language doesn't exist, insert it and associate it with the project
                    const result = updateLanguage.run(language);
                    updateProjectLanguage.run(projectId, result.lastInsertRowid);
                }
            });
        })();

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
