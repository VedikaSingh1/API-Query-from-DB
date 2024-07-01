const getRouteUtility = require('./utilityMethod.js');

async function getUserById(userId) {
    const queryString = `SELECT * FROM public."Vedika_CUSTOMER" WHERE "CustomerID" = $1`;
    try {
        const queryResult = await getRouteUtility.getQueryResultWithSingleBindVariable(queryString, userId);
        console.log(queryResult.rows);
        return queryResult.rows;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

async function getUsersByIds(userIds) {
    const queryString = `SELECT * FROM public."Vedika_CUSTOMER" WHERE "CustomerID" = ANY($1)`;
    try {
        const queryResult = await getRouteUtility.getQueryResultWithSingleBindVariable(queryString, userIds);
        console.log(queryResult.rows);
        return queryResult.rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

async function insertUser(userData) {
    const queryString = `INSERT INTO public."Vedika_CUSTOMER" ("CustomerID", "PhoneNumber", "LoyaltyPoints", "DateOfBirth", "CustomerName", "Email") 
                         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const bindArray = [
        userData.CustomerID,
        userData.PhoneNumber,
        userData.LoyaltyPoints,
        userData.DateOfBirth,
        userData.CustomerName,
        userData.Email
    ];
    try {
        const queryResult = await getRouteUtility.getQueryResultWithMultipleBindVariables(queryString, bindArray);
        console.log(queryResult.rows);
        return queryResult.rows;
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}

async function insertUsers(usersData) {
    const values = usersData.map(user => `(${user.CustomerID}, '${user.PhoneNumber}', ${user.LoyaltyPoints}, '${user.DateOfBirth}', '${user.CustomerName}', '${user.Email}')`).join(", ");
    const queryString = `INSERT INTO public."Vedika_CUSTOMER" ("CustomerID", "PhoneNumber", "LoyaltyPoints", "DateOfBirth", "CustomerName", "Email") 
                         VALUES ${values} RETURNING *`;
    try {
        const queryResult = await getRouteUtility.getQueryResult(queryString);
        console.log(queryResult.rows);
        return queryResult.rows;
    } catch (error) {
        console.error('Error inserting users:', error);
        throw error;
    }
}

async function updateUser(userData) {
    const queryString = `UPDATE public."Vedika_CUSTOMER" SET 
                         "PhoneNumber" = $2, 
                         "LoyaltyPoints" = $3, 
                         "DateOfBirth" = $4, 
                         "CustomerName" = $5, 
                         "Email" = $6 
                         WHERE "CustomerID" = $1 RETURNING *`;
    const bindArray = [
        userData.CustomerID,
        userData.PhoneNumber,
        userData.LoyaltyPoints,
        userData.DateOfBirth,
        userData.CustomerName,
        userData.Email
    ];
    try {
        const queryResult = await getRouteUtility.getQueryResultWithMultipleBindVariables(queryString, bindArray);
        console.log(queryResult.rows);
        return queryResult.rows;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

async function updateUsers(usersData) {
    const queryResultData = [];
    for (const user of usersData) {
        const queryString = `UPDATE public."Vedika_CUSTOMER" SET 
                             "PhoneNumber" = $2, 
                             "LoyaltyPoints" = $3, 
                             "DateOfBirth" = $4, 
                             "CustomerName" = $5, 
                             "Email" = $6 
                             WHERE "CustomerID" = $1 RETURNING *`;
        const bindArray = [
            user.CustomerID,
            user.PhoneNumber,
            user.LoyaltyPoints,
            user.DateOfBirth,
            user.CustomerName,
            user.Email
        ];
        try {
            const queryResult = await getRouteUtility.getQueryResultWithMultipleBindVariables(queryString, bindArray);
            queryResultData.push(queryResult.rows[0]);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
    return queryResultData;
}

async function deleteUser(userId) {
    const queryString = `DELETE FROM public."Vedika_CUSTOMER" WHERE "CustomerID" = $1 RETURNING *`;
    try {
        const queryResult = await getRouteUtility.getQueryResultWithSingleBindVariable(queryString, userId);
        console.log(queryResult.rows);
        return queryResult.rows;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

async function deleteUsers(userIds) {
    const queryString = `DELETE FROM public."Vedika_CUSTOMER" WHERE "CustomerID" = ANY($1) RETURNING *`;
    try {
        const queryResult = await getRouteUtility.getQueryResultWithSingleBindVariable(queryString, userIds);
        console.log(queryResult.rows);
        return queryResult.rows;
    } catch (error) {
        console.error('Error deleting users:', error);
        throw error;
    }
}

module.exports = { getUserById, getUsersByIds, insertUser, insertUsers, updateUser, updateUsers, deleteUser, deleteUsers };
