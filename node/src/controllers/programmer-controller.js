import statusCodes, { StatusCodes } from "http-status-codes"; // Importing the 'http-status-codes' library
import * as db from "../database/helpers/programmer-database-helper.js"

export const getProgrammer = async (req, res) => {
    const id = req.params.id;
    res.json(db.getProgrammer(id));
    res
        .status
        .send(statusCodes.OK);
}

export const addProgrammer = () => {

}

export const deleteProgrammer = () => {

}

export const putProgrammer = () => {

}
