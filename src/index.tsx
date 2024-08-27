import {render} from 'solid-js/web'
import App from './App'

const appContainer = document.getElementById('app')
if (!appContainer) throw new Error('#app not found')

render(App, appContainer)
