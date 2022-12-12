const fetch = require('node-fetch')

function getToken(code) {
    var details = {
        grant_type: 'authorization_code',
        code: code,
        client_id: process.env.USER_POOL_CLIENT_ID,

        // TODO: replace with ref
        redirect_uri:
            'https://vn4ryp3ui6.execute-api.us-east-1.amazonaws.com/Prod/login'
    }

    var formBody = []
    for (var property in details) {
        var encodedKey = encodeURIComponent(property)
        var encodedValue = encodeURIComponent(details[property])
        formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    // TODO: replace with ref
    const AUTH_DOMAIN =
        'sls-preact-251256923172.auth.us-east-1.amazoncognito.com'
    // node fetch
    return fetch(`https://${AUTH_DOMAIN}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    }).then((x) => x.json())
}

exports.handler = async (event) => {
    console.log(JSON.stringify(event, undefined, 2))
    const date = () => {
        const now = new Date()
        const date = new Date(now.setDate(now.getDate() + 5))
        return date
    }

    const data = JSON.parse(event.body)
    const res = await getToken(data.code)

    return {
        statusCode: 200,
        headers: {
            'Set-Cookie': `jwt=${
                res.id_token
            }; Expires=${date()};path=/Prod; SameSite=Strict; Secure;`
        },
        body: JSON.stringify({
            status: 'success',
            jwt: res.id_token
        })
    }
}
