const { CognitoJwtVerifier } = require('aws-jwt-verify')

const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.USER_POOL_ID, //'us-east-1_mSAhUI4G5',
    tokenUse: 'id',
    clientId: process.env.USER_POOL_CLIENT_ID //'5knr0se7olbpjm385an9ml911c'
})

exports.handler = async (event) => {
    console.log(JSON.stringify(event, undefined, 2))
    const headers = event.headers
    const cookie =
        headers.cookie && headers.cookie.startsWith('jwt=')
            ? headers.cookie.split('=')[1]
            : 'no cookie set'

    if (cookie === 'no cookie set') {
        throw new Error('No cookie provided')
    }

    const payload = await verifier.verify(cookie)
    return {
        principalId: payload.email,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: 'Allow',
                    // TODO: replace this with a reference
                    Resource:
                        'arn:aws:execute-api:us-east-1:251256923172:vn4ryp3ui6/*'
                }
            ]
        },
        context: {
            id: payload.sub,
            email: payload.email
        }
    }
}
