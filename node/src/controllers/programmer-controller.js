import statusCodes, { StatusCodes } from "http-status-codes"; // Importing the 'http-status-codes' library
import * as db from "../database/helpers/programmer-database-helper.js"

export const getProgrammer = async (req, res) => {
    const id = req.params.id;
    res.json(db.getProgrammer(id));
}

export const addProgrammer = (req, res) => {
    try {
        const programmer = req.body;

        if (!programmer || Object.keys(programmer).length === 0) {
            res
                .status(statusCodes.BAD_REQUEST)
                .send("Empty request body. Please provide programmer age and name.");
            return;
        }

        if (!programmer.name) {
            res
                .status(statusCodes.BAD_REQUEST)
                .send("Empty programmer name. Please provide programmer name.");
            return;
        }

        if (!programmer.age) {
            res
                .status(statusCodes.BAD_REQUEST)
                .send("Empty programmer age. Please provide programmer age.");
            return;
        }

        const returnValue = db.addProgrammer(programmer);

        res
            .status(statusCodes.CREATED)
            .send(`Programmer with id ${returnValue} added.`);
    } catch (error) {
        console.error(error);
        res
            .status(statusCodes.INTERNAL_SERVER_ERROR)
            .send("An error occurred while creating the programmer: " + error.message);
    }
}

export const deleteProgrammer = () => {

}

export const putProgrammer = () => {

}
