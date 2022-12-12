import { h } from 'preact'
/** @jsx h */

const style = {
    backgroundColor: '#223',
    color: 'white',
    margin: 0,
    padding: 40
}

const loginLink =
    'https://sls-preact-251256923172.auth.us-east-1.amazoncognito.com/login?client_id=5knr0se7olbpjm385an9ml911c&response_type=code&scope=email+openid+profile&redirect_uri=https%3A%2F%2Fvn4ryp3ui6.execute-api.us-east-1.amazonaws.com%2FProd%2Flogin'

export default () => {
    return (
        <div style={style}>
            <p>Marketing Page aimed and convincing you to try our product</p>
            <a href={loginLink}>Login</a>
        </div>
    )
}
