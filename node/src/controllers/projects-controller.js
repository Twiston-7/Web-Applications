import statusCodes from "http-status-codes";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databasePath = path.join(__dirname, "../database/db/data.sqlite");
const db = new Database(databasePath);

const getAllProjectsQuery = `
SELECT projects.id, projects.name, GROUP_CONCAT(languages.name) AS languages, GROUP_CONCAT(skills.name) AS skills
FROM projects
LEFT JOIN project_languages ON projects.id = project_languages.project_id
LEFT JOIN languages ON project_languages.language_id = languages.id
LEFT JOIN project_skills ON projects.id = project_skills.project_id
LEFT JOIN skills ON project_skills.skill_id = skills.id
GROUP BY projects.id
`;

export const getAllProjects = async function (req, res) {
    const projects = db.prepare(getAllProjectsQuery).all();
    res.json(projects);
};

export const addProject = async function (req, res) {
    const project = req.body;

    db.transaction(() => {
        const insertProjectQuery = `
      INSERT INTO projects (name)
      VALUES (?)
    `;

        const insertLanguageQuery = `
      INSERT INTO languages (name)
      VALUES (?)
    `;

        const insertProjectLanguageQuery = `
      INSERT INTO project_languages (project_id, language_id)
      VALUES (?, ?)
    `;

        const insertSkillQuery = `
      INSERT INTO skills (name)
      VALUES (?)
    `;

        const insertProjectSkillQuery = `
      INSERT INTO project_skills (project_id, skill_id)
      VALUES (?, ?)
    `;

        const { name, languages, skills } = project;

        const insertProject = db.prepare(insertProjectQuery);
        const insertLanguage = db.prepare(insertLanguageQuery);
        const insertProjectLanguage = db.prepare(insertProjectLanguageQuery);
        const insertSkill = db.prepare(insertSkillQuery);
        const insertProjectSkill = db.prepare(insertProjectSkillQuery);

        const projectResult = insertProject.run(name);
        const projectId = projectResult.lastInsertRowid;

        skills.forEach((skill) => {
            const skillResult = insertSkill.run(skill);
            const skillId = skillResult.lastInsertRowid;
            insertProjectSkill.run(projectId, skillId);
        });

        languages.forEach((language) => {
            const languageResult = insertLanguage.run(language);
            const languageId = languageResult.lastInsertRowid;
            insertProjectLanguage.run(projectId, languageId);
        });
    })();

    res
        .status(statusCodes.CREATED)
        .send(`Project with name ${project.name} added.`);
};

export const deleteProject = async function (req, res) {
    const projectId = req.params.id;

    const deleteProjectQuery = `
    DELETE FROM projects
    WHERE id = ?
  `;

    const deleteProject = db.prepare(deleteProjectQuery);
    const result = deleteProject.run(projectId);

    if (result.changes === 0) {
        res
            .status(statusCodes.NOT_FOUND)
            .send(`Project with ID ${projectId} not found.`);
    } else {
        res
            .status(statusCodes.OK)
            .send(`Project with ID ${projectId} deleted.`);
    }
};
