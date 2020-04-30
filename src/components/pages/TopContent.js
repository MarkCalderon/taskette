import React from 'react'

import ListData from '../part/ListData'


class TopContent extends React.Component {

    constructor() {
        super()

        // Initialize the state,
        // State is an object {},
        // PostList is an array []
        this.state = {
            postList: [],
            firstName: ''
        }
        
        // Requirement to bind function to be called.
        this.handleChange = this.handleChange.bind(this)
    }

    // Fetch Data from JSONPlaceholder
    fetchData() {
        fetch('https://jsonplaceholder.typicode.com/posts/')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                // Stores setState to object without function.
                this.setState({
                    postList: data,
                })
            })
    }

    handleChange(event) {
        const {name, value} = event.target
        // If enter key is pressed
        if(event.keyCode === 13) {
            event.preventDefault()
            // Get index id
            let lastIndex = this.state.postList.length
            //Object Array to hold new values
            let obj = {}
            // Pass new values to postList array as a new object
            obj['userId'] = 5
            obj['id'] = lastIndex+1
            obj['title'] = value
            obj['body'] = 'Body text'
            
            // Set value, but first gets the previous state to pass through the parameter
            this.setState(prevState => ({
                // Stores the obj array value and, using spread operator, adds all the rest of the prevState.postList array
                postList: [obj, ...prevState.postList]
            }), () => {
                // Once finish, log the current state postList array.
                console.log(this.state.postList)
            })
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        // Slices/take only 5 items out of the original Array
        // Map only works for Arrays
        const dataIn = this.state.postList.slice(0,100).map(item => {
            // postList is passed as an item.
            return (
                    // Pass values of the state to the component as a prop.
                    <ListData key={item.id} title={item.title} description={item.body} />
            )
        })


        return (
            <main>
                <div className="inner">
                    <div className="taskInput">
                        <form>
                            <input type="text" name="firstName" placeholder="Enter task here..." onKeyDown={this.handleChange} />
                        </form>
                    </div>
                    <div className="taskList">
                        { dataIn }
                    </div>
                </div>
            </main>
        )
    }
}

export default TopContent