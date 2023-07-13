import Database from "better-sqlite3";
import path from "path";

const __dirname = decodeURI(path.dirname(new URL(import.meta.url).pathname).replace(/^\//, ''));
const databasePath = path.normalize(path.join(__dirname, "data.sqlite"));

const db = new Database(databasePath);

db.exec(`
  DROP TABLE IF EXISTS article;
`);

db.exec(`
  DROP TABLE IF EXISTS project;
`);

db.exec(`
  DROP TABLE IF EXISTS programmer;
`);

console.log("Dropped tables successfully.");

// Create the Programmer table
db.exec(`
  CREATE TABLE IF NOT EXISTS programmer (
    programmerID INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER
  )
`);

// Create the Project table
db.exec(`
  CREATE TABLE IF NOT EXISTS project (
    projectID INTEGER PRIMARY KEY AUTOINCREMENT,
    programmer_id INTEGER,
    name TEXT,
    skills TEXT,
    languages TEXT,
    
    FOREIGN KEY (programmer_id) REFERENCES Programmer(programmerID)
  )
`);

// Create the Article table
db.exec(`
  CREATE TABLE IF NOT EXISTS article (
    articleID INTEGER PRIMARY KEY AUTOINCREMENT,
    programmer_id INTEGER,
    project_id INTEGER UNIQUE,
    paragraph TEXT,
    
    FOREIGN KEY (programmer_id) REFERENCES Programmer(programmerID),
    FOREIGN KEY (project_id) REFERENCES Project(projectID)
  )
`);

console.log("Tables created successfully.");

db.exec(`
  INSERT INTO programmer (name, age) 
  VALUES ('Harry', 12)
`);

// Create projects
db.exec(`
  INSERT INTO project (name, skills, languages, programmer_id) VALUES ('Project 1', 'Skill A, Skill B', 'Language X, Language Y', 1)
`);

db.exec(`
    INSERT INTO article (programmer_id, project_id, paragraph) 
    VALUES (1, 1, 'This is project 1')
`)

db.exec(`
  INSERT INTO project (name, skills, languages, programmer_id) VALUES ('Project 2', 'Skill C, Skill D', 'Language Z, Language W', 1)
`);

db.exec(`
    INSERT INTO article (programmer_id, project_id, paragraph) 
    VALUES (1, 2, 'This is project 2')
`)

console.log("Projects created successfully.");