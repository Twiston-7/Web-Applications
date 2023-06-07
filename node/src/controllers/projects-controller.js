import statusCodes from "http-status-codes";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databasePath = path.join(__dirname, "../database/db/data.sqlite");
const db = new Database(databasePath);

const getAllProjectsQuery = `
SELECT projects.id, projects.name, projects.language, GROUP_CONCAT(skills.name) AS skills
FROM projects
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
        INSERT INTO projects (name, language)
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

        const { name, language, skills } = project;
        const insertProject = db.prepare(insertProjectQuery);
        const insertSkill = db.prepare(insertSkillQuery);
        const insertProjectSkill = db.prepare(insertProjectSkillQuery);

        const projectResult = insertProject.run(name, language);
        const projectId = projectResult.lastInsertRowid;

        skills.forEach((skill) => {
            const skillResult = insertSkill.run(skill);
            const skillId = skillResult.lastInsertRowid;
            insertProjectSkill.run(projectId, skillId);
        });
    })();

    res
        .status(statusCodes.CREATED)
        .send(`Project with name ${project.name} added.`);
};
