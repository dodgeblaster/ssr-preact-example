/**
 * a aws lambda function that scans a dynamodb table for all items with a limit
 * of 10 and takes a pagination cursor
 * @param {string} cursor
 */
const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()
const tableName = process.env.TABLE_NAME
module.exports.getGoals = async (props) => {
    const params = {
        TableName: tableName,
        Limit: 10
    }

    if (props.cursor) {
        params.ExclusiveStartKey = {
            id: props.cursor
        }
    }
    const result = await dynamodb.scan(params).promise()
    return result.Items
}
