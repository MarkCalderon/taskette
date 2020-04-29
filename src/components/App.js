import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


// Common
import Header from './../components/common/Header'
import Footer from './../components/common/Footer'

// Pages
import TopContent from "./../components/pages/TopContent"

class App extends React.Component {
	render() {
		return (
			<Router>
				<Header />

				<Switch>
					<Route path="/" exact component={TopContent}/>
				</Switch>
				
				<Footer />
			</Router>
		)
	}
}

export default App
