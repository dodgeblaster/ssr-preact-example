const headers = {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Cookie',
    'Access-Control-Allow-Methods': 'OPTIONS,GET'
}

const domain = 'vn4ryp3ui6.execute-api.us-east-1.amazonaws.com'
const http = {
    success: (x) => ({
        statusCode: 200,
        body: x,
        headers
    })
}

exports.handler = async (event) => {
    // Log the event argument for debugging and for use in local development.
    console.log(JSON.stringify(event, undefined, 2))

    const getParams = (event) => {
        const queryStringParameters = event.queryStringParameters
        return queryStringParameters.code
    }

    return http.success(
        `
    <body>
        <div>
            <p>Logging in...</p>
        </div>
        <script>
            function login() {
                fetch('https://vn4ryp3ui6.execute-api.us-east-1.amazonaws.com/Prod/login', {
                    method: 'POST',
                    body:  JSON.stringify({
                        code: "${getParams(event)}"
                    })
                })
                .then(res => res.json())
                .then((x) => {
                    window.location.href = 'https://${domain}/Prod/goals'
                })
            }

            login()
        </script>
    </body>`
    )
}
