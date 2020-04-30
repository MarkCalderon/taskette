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
        this.handleEnter = this.handleEnter.bind(this)
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

    handleEnter(event) {
        const {name, value} = event.target
        // If enter key is pressed
        if(event.keyCode === 13) {
            // Prevents default reloading of page upon submission of form.
            event.preventDefault()
            // Set value, but first gets the previous state to pass through the parameter
            // setState is a asynchronous procedure, meaning it happens at the same time.
            this.setState(prevState => ({
                postList: [
                {
                    userID: 5,
                    // Get last index id and add +1
                    id: prevState.postList.length+1,
                    title: value,
                    body: '2'
                    // Retrieves the previous state of array and adds all/rest of the items
                }, ...prevState.postList],
            }), () => {
                // Once finish, log the current state postList array.
                console.log(this.state.postList)
            })
                // Input field value is cleared
                event.target.value = ''
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
                    <ListData key={item.id} title={item.title} />
            )
        })


        return (
            <main>
                <div className="inner">
                    <div className="taskInput">
                        <form>
                            <input type="text" name="firstName" defaultValue={this.state.firstName} placeholder="Enter task here..." onKeyDown={this.handleEnter} />
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