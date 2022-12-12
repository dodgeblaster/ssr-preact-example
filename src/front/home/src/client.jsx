import { hydrate } from 'preact'
import Page from './containers/Page.jsx'
import { h } from 'preact'
/** @jsx h */

hydrate(
    <Page comments={window._initdata.comments} />,
    document.getElementById('container')
)
