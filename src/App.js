import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import TopContent from "./components/pages/TopContent"

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" exact component={TopContent}/>
				</Switch>
			</Router>
		)
	}
}

export default App
