import { hydrate } from 'preact'
import Page from './containers/Page.jsx'
import { h } from 'preact'
/** @jsx h */

hydrate(
    <Page goals={window._initdata.goals} />,
    document.getElementById('container')
)
