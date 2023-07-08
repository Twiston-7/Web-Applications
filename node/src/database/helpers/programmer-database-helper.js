import Database from "better-sqlite3"; // Importing the 'better-sqlite3' library
import { fileURLToPath } from "url"; // Importing the 'url' module
import path from "path"; // Importing the 'path' module

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