import render from 'preact-render-to-string'
import fs from 'fs'
import Page from './containers/Page'
import { getGoals } from './getGoals'
import { CognitoJwtVerifier } from 'aws-jwt-verify'

const verifier = CognitoJwtVerifier.create({
    userPoolId: 'us-east-1_mSAhUI4G5',
    tokenUse: 'id',
    clientId: '5knr0se7olbpjm385an9ml911c'
})
import { h } from 'preact'
/** @jsx h */

const js = fs.readFileSync('./client.js', 'utf8')

const html = (goals, content, js) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>preact ssr demo</title>
</head>
<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box; 
  font-family: sans-serif;
}
</style>
<body>
  <div id="container">
  ${content}
  </div>
<script>window._initdata = {goals: ${JSON.stringify(goals)}}</script>
  <script src="https://cdn.jsdelivr.net/npm/preact@10.11.3/dist/preact.min.js"></script>
  <script>${js}</script>
</body>
</html>`

const headers = {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,GET'
}

const http = {
    success: (x) => ({
        statusCode: 200,
        body: x,
        headers
    })
}

const App = (props) => <Page goals={props.goals} />
/**
 * make lorem ipsum constant
 */
export const handler = async (event) => {
    const headers = event.headers
    const cookie =
        headers.cookie && headers.cookie.startsWith('jwt=')
            ? headers.cookie.split('=')[1]
            : 'no cookie set'
    const payload = await verifier.verify(cookie)
    const goals = await getGoals({ cursor: null })
    const content = render(App({ goals }))
    const h = html(goals, content, js)
    return http.success(h)
}
