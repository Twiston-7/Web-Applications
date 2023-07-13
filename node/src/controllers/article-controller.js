import statusCodes from "http-status-codes"; // Importing the 'http-status-codes' library
import * as db from "../database/helpers/article-database-helper.js"

export const getArticle = async (req, res) => {
    const id = req.params.id;
    res.json(db.getArticle(id));
}

export const addArticle = async (req, res) => {
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

    db.addArticle(article);
}

export const deleteArticle = async (req, res) => {

}

export const putArticle = async (req, res) => {

}
