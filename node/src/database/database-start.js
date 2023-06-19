import Database from "better-sqlite3";
import path from "path";

const __dirname = decodeURI(path.dirname(new URL(import.meta.url).pathname).replace(/^\//, ''));
const databaseDirectory = path.join(__dirname, "db");
const databasePath = path.normalize(path.join(databaseDirectory, "data.sqlite"));

const db = new Database(databasePath);

const dropTablesQuery = `
DROP TABLE IF EXISTS project_skills;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS languages;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS project_languages;
`;

const createTablesQuery = `
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS languages (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS project_languages (
    project_id INTEGER,
    language_id INTEGER,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, language_id)
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

db.exec(dropTablesQuery);
db.exec(createTablesQuery);

console.log('Project tables created successfully.');

export default db;
