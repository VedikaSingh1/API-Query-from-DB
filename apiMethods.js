require('dotenv').config();
const { getUserById, getUsersByIds, insertUser, insertUsers, updateUser, updateUsers, deleteUser, deleteUsers } = require('./database.js');
const { badRequest, notFound, internalServerError } = require('./errors.js');

const getuser = async (request, response) => {
    try {
        let userID = request?.query?.CustomerID;
        if (!userID) {
            return response.status(400).send(badRequest);
        }
        let queryResultData = await getUserById(userID);
        if (queryResultData.length > 0) {
            return response.status(200).send(queryResultData);
        } else {
            return response.status(404).send(notFound);
        }
    } catch (error) {
        return response.status(500).send(internalServerError);
    }
};

const getusers = async (request, response) => {
    try {
        const userIDs = request.body.CustomerIDs;
        if (!userIDs || userIDs.length === 0) {
            return response.status(400).send(badRequest);
        }
        let queryResultData = await getUsersByIds(userIDs);
        return response.status(200).send(queryResultData);
    } catch (error) {
        return response.status(500).send(internalServerError);
    }
};

const insertuser = async (request, response) => {
    try {
        const userData = request.body;
        let queryResultData = await insertUser(userData);
        return response.status(201).send(queryResultData);
    } catch (error) {
        return response.status(500).send(internalServerError);
    }
};

const insertusers = async (request, response) => {
    try {
        const usersData = request.body;
        let queryResultData = await insertUsers(usersData);
        return response.status(201).send(queryResultData);
    } catch (error) {
        return response.status(500).send(internalServerError);
    }
};

const updateuser = async (request, response) => {
    try {
        const userData = request.body;
        let queryResultData = await updateUser(userData);
        return response.status(200).send(queryResultData);
    } catch (error) {
        return response.status(500).send(internalServerError);
    }
};

const updateusers = async (request, response) => {
    try {
        const usersData = request.body;
        let queryResultData = await updateUsers(usersData);
        return response.status(200).send(queryResultData);
    } catch (error) {
        return response.status(500).send(internalServerError);
    }
};

const deleteuser = async (request, response) => {
    try {
        let userID = request?.query?.CustomerID;
        if (!userID) {
            return response.status(400).send(badRequest);
        }
        let queryResultData = await deleteUser(userID);
        return response.status(200).send(queryResultData);
    } catch (error) {
        return response.status(500).send(internalServerError);
    }
};

const deleteusers = async (request, response) => {
    try {
        const userIDs = request.body.CustomerIDs;
        if (!userIDs || userIDs.length === 0) {
            return response.status(400).send(badRequest);
        }
        let queryResultData = await deleteUsers(userIDs);
        return response.status(200).send(queryResultData);
    } catch (error) {
        return response.status(500).send(internalServerError);
    }
};

module.exports = { getuser, getusers, insertuser, insertusers, updateuser, updateusers, deleteuser, deleteusers };
