import Database from "better-sqlite3"; // Importing the 'better-sqlite3' library
import { fileURLToPath } from "url"; // Importing the 'url' module
import path from "path"; // Importing the 'path' module

// Getting the current file name and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constructing the path to the database file
const databasePath = path.join(__dirname, "../db/data.sqlite");

export const getProjects = () => {
    // Creating a new instance of the database
    const db = new Database(databasePath);

    const getAllProjectsQuery = `
        SELECT *
        FROM project
        `;

    const returnValue = db.prepare(getAllProjectsQuery).all();
    db.close();
    return returnValue;
}

export const addProject = (project) => {
    // Creating a new instance of the database
    const db = new Database(databasePath);

    try {
        db.transaction(() => {
            // Insert the project into the 'projects' table
            const insertProjectQuery = `
        INSERT INTO project (name, languages, skills, programmer_id)
        VALUES (?, ?, ?, ?)
      `;

            db.prepare(insertProjectQuery).run(
                project.name,
                project.languages.join(", "),
                project.skills.join(", "),
                project.programmerID
            );
        })();

        console.log("Project added successfully.");
    } catch (error) {
        console.error("Error adding project: " + error.message);
        throw new Error("Error adding project: " + error.message);
    } finally {
        db.close();
    }
};

export const deleteProject = (projectId) => {
    // Creating a new instance of the database
    const db = new Database(databasePath);

    const deleteProjectQuery = `
        DELETE FROM project
        WHERE projectID = ?
    `;

    const deleteProject = db.prepare(deleteProjectQuery);
    const returnValue = deleteProject.run(projectId);
    db.close();
    return returnValue;
}

export const updateProject = (projectId, updatedProject) => {
    // Creating a new instance of the database
    const db = new Database(databasePath);

    // Construct the UPDATE query dynamically based on the fields present in the updated project
    let updateQuery = 'UPDATE projects SET ';
    let params = [];

    if (updatedProject.programmerID) {
        updateQuery += 'programmerID = ?, ';
        params.push(updatedProject.programmerID);
    }

    if (updatedProject.name) {
        updateQuery += 'name = ?, ';
        params.push(updatedProject.name);
    }

    if (updatedProject.skills) {
        updateQuery += 'skills = ?, ';
        params.push(updatedProject.skills);
    }

    if (updatedProject.languages) {
        updateQuery += 'languages = ?, ';
        params.push(updatedProject.languages);
    }

    // Remove the trailing comma and space from the query string
    updateQuery = updateQuery.slice(0, -2);

    // Append the WHERE condition to the query
    updateQuery += ' WHERE projectID = ?';
    params.push(projectId);

    // Execute the UPDATE query
    try {
        db.prepare(updateQuery).exec(params);
        console.log(`Project with ID ${projectId} updated successfully.`);
    } catch (error) {
        console.error('Error updating project:', error.message);
    } finally {
        db.close();
    }
}