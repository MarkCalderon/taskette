import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


// Common
import Header from './../components/common/Header'
import Footer from './../components/common/Footer'

// Pages
import TopContent from "./../components/pages/TopContent"

class App extends React.Component {

	firebaseConfig() {
		var firebaseConfig = {
		  apiKey: "AIzaSyAen15I99ZBiMGsPEF4Z6x3FL4y1FqGy58",
		  authDomain: "taskette-24f81.firebaseapp.com",
		  databaseURL: "https://taskette-24f81.firebaseio.com",
		  projectId: "taskette-24f81",
		  storageBucket: "taskette-24f81.appspot.com",
		  messagingSenderId: "61182236818",
		  appId: "1:61182236818:web:325f1f1045cdb243036e4b"
		};
		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
	}

	componentDidMount() {
		this.firebaseConfig()
	}

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
