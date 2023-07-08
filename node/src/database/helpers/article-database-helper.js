import Database from "better-sqlite3"; // Importing the 'better-sqlite3' library
import { fileURLToPath } from "url"; // Importing the 'url' module
import path from "path"; // Importing the 'path' module

// Getting the current file name and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constructing the path to the database file
const databasePath = path.join(__dirname, "../db/data.sqlite");

export const getArticle = (id) => {
    // Creating a new instance of the database
    const db = new Database(databasePath);

    const getArticleQuery = `
        SELECT *
        FROM article
        WHERE articleID = ?
    `;
    const stmt = db.prepare(getArticleQuery);

    const result = stmt.get(id);
    db.close();

    return result;
}

export const addArticle = (article) => {
    // https://pastebin.com/P4ux2uXd

    // Creating a new instance of the database
    const db = new Database(databasePath);

    const addArticleQuery = `
        INSERT INTO article (programmerID, projectID, paragraph)
        VALUES (
            (SELECT programmerID 
            FROM project 
            WHERE projectID = ?),
            ?,
            ?
        )
    `;

    const pStmt = db.prepare(addArticleQuery);

    try {
        pStmt.exec(article.projectID, article.projectID, article.paragraph);
    } catch (Error) {
        console.error("Error adding article: " + Error.message);
        throw new Error("Error adding article: " + Error.message);
    } finally {
        db.close();
    }
}

export const deleteArticle = (articleID) => {
    // Creating a new instance of the database
    const db = new Database(databasePath);

    const deleteArticleQuery = `
        DELETE FROM article
        WHERE articleID = ?
    `;

    const returnValue = db.prepare(deleteArticleQuery).run(articleID);
    db.close();
    return returnValue;
}

export const updateArticle = (articleID, updatedArticle) => {
    // Creating a new instance of the database
    const db = new Database(databasePath);

    // Construct the UPDATE query dynamically based on the fields present in the updated project
    let updateQuery = 'UPDATE article SET ';
    let params = [];

    if (updatedArticle.programmerID) {
        updateQuery += 'programmerID = ?, ';
        params.push(updatedArticle.programmerID);
    }

    if (updatedArticle.paragraph) {
        updateQuery += 'paragraph = ?, ';
        params.push(updatedArticle.paragraph);
    }

    // Remove the trailing comma and space from the query string
    updateQuery = updateQuery.slice(0, -2);

    // Append the WHERE condition to the query
    updateQuery += ' WHERE articleID = ?';
    params.push(articleID);

    // Execute the UPDATE query
    try {
        db.prepare(updateQuery).exec(params);
        console.log(`Article with ID ${articleID} updated successfully.`);
    } catch (error) {
        console.error('Error updating article:', error.message);
    } finally {
        db.close();s
    }
}