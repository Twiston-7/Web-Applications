import Database from "better-sqlite3"; // Importing the "better-sqlite3" library
import { fileURLToPath } from "url"; // Importing the "url" module
import path from "path"; // Importing the "path" module

// Getting the current file name and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constructing the path to the database file
const databasePath = path.join(__dirname, "../db/data.sqlite");

export const getProgrammer = (id) => {
    // Creating a new instance of the database
    const db = new Database(databasePath);

    const getProgrammerQuery = `
        SELECT *
        FROM programmer
        WHERE programmerID = ?
    `;
    const stmt = db.prepare(getProgrammerQuery);

    const result = stmt.get(id);
    db.close();

    return result;
}

export const addProgrammer = (programmer) => {
    // Creating a new instance of the database
    const db = new Database(databasePath);

    const addProgrammerQuery = `
        INSERT INTO programmer (name, age)
        VALUES (?, ?)
    `

    try {
        const result = db.prepare(addProgrammerQuery).run(
            programmer.name,
            programmer.age.toString()
        )
        return result.lastInsertRowid; // Retrieve the ID of the newly inserted row
    } catch (Error) {
        console.error("Error adding programmer: " + Error.message);
        throw new Error("Error adding programmer: " + Error.message);
    } finally {
        db.close()
    }
}

export const deleteProgrammer = (programmerID) => {
    // Creating a new instance of the database
    const db = new Database(databasePath);

    const deleteProgrammerQuery = `
        DELETE FROM programmer
        WHERE articleID = ?
    `;

    const returnValue = db.prepare(deleteProgrammerQuery).run(programmerID);
    db.close();
    return returnValue;
}
export const updateProgrammer = (programmerID, updatedProgrammer) => {
    // Creating a new instance of the database
    const db = new Database(databasePath);

    // Construct the UPDATE query dynamically based on the fields present in the updated project
    let updateQuery = "UPDATE article SET ";
    let params = [];

    if (updatedProgrammer.name) {
        updateQuery += "name = ?, ";
        params.push(updatedProgrammer.name);
    }

    if (updatedProgrammer.age) {
        updateQuery += "age = ?, ";
        params.push(updatedProgrammer.age);
    }

    // Remove the trailing comma and space from the query string
    updateQuery = updateQuery.slice(0, -2);

    // Append the WHERE condition to the query
    updateQuery += " WHERE programmerID = ?";
    params.push(programmerID);

    // Execute the UPDATE query
    try {
        db.prepare(updateQuery).exec(params);
        console.log(`Programmer with ID ${programmerID} updated successfully.`);
    } catch (error) {
        console.error("Error updating programmer:", error.message);
    } finally {
        db.close();
    }
}
