const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
}

const http = {
    success: (x) => ({
        statusCode: 200,
        body: JSON.stringify(x),
        headers
    })
}

/**
 * a lambda function that receives an event bridge event and
 * sets an item to a dynamodb table
 * @param {string} id
 * @param {string} name
 * @param {string} content
 */
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
const tableName = process.env.TABLE_NAME
exports.handler = async (event) => {
    console.log('processing event: ', event)

    const params = {
        TableName: tableName,
        Item: {
            pk: '100',
            sk: '200',
            title: 'title',
            content: 'content'
        }
    }
    try {
        const result = await docClient.put(params).promise()
        return http.success({ success: true })
    } catch (err) {
        console.log('error: ', err)
    }
}
