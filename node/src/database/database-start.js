import Database from "better-sqlite3";
import path from "path";

const __dirname = decodeURI(path.dirname(new URL(import.meta.url).pathname).replace(/^\//, ''));
const databaseDirectory = (__dirname + "/db");
const databasePath = path.normalize(path.join(databaseDirectory, "data.sqlite"));
debugger;
const db = new Database(databasePath);

const createTablesQuery = `
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    language TEXT
);

CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS project_skills (
    project_id INTEGER,
    skill_id INTEGER,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, skill_id)
);
`;

db.exec(createTablesQuery);

console.log('Project tables created successfully.');


