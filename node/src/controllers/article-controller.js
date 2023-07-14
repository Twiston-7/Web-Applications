import statusCodes from "http-status-codes"; // Importing the "http-status-codes" library
import * as db from "../database/helpers/article-database-helper.js"

export const getArticle = async (req, res) => {
    const id = req.params.id;
    res.json(db.getArticle(id));
}

export const addArticle = async (req, res) => {
    try {
        const article = req.body;

        if (!article || Object.keys(article).length === 0) {
            res
                .status(statusCodes.BAD_REQUEST)
                .send("Empty request body. Please provide article details.");
            return;
        }

        if (!article.projectID) {
            res
                .status(statusCodes.BAD_REQUEST)
                .send("No project ID. Please provide a valid project ID. ");
            return;
        }

        if (!article.paragraph) {
            res
                .status(statusCodes.BAD_REQUEST)
                .send("No paragraph (text). Please provide a valid paragraph. ");
            return;
        }

        const returnValue = db.addArticle(article);

        res
            .status(statusCodes.CREATED)
            .send(`Article with id ${returnValue} added.`);
    } catch (error) {
        console.error(error);
        res
            .status(statusCodes.INTERNAL_SERVER_ERROR)
            .send("An error occurred while creating the article: " + error.message);
    }
}

export const deleteArticle = async (req, res) => {
    const articleId = req.params.id;

    const result = db.deleteArticle(articleId);

    if (result.changes === 0) {
        res
            .status(statusCodes.NOT_FOUND)
            .send(`Article with ID ${articleId} not found.`);
    } else {
        res
            .status(statusCodes.OK)
            .send(`Article with ID ${articleId} deleted.`);
    }
}

export const updateArticle = async (req, res) => {
    const articleId = req.params.id;
    const updatedArticle = req.body;

    if (!updatedArticle || Object.keys(updatedArticle).length === 0) {
        // Return an error response if the request body is empty
        res
            .status(statusCodes.BAD_REQUEST)
            .send("Empty request body. Please provide project details.");
        return;
    }

    try {
        db.updateArticle(articleId, updatedArticle);
        res
            .status(statusCodes.OK)
            .send(`Project with ID ${articleId} updated.`);
    } catch (error) {
        console.error(error);
        res
            .status(statusCodes.INTERNAL_SERVER_ERROR)
            .send("An error occurred while updating the project: " + error.message);
    }
}
