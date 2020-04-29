import React from 'react'

import ListData from '../part/ListData'


class TopContent extends React.Component {

    constructor() {
        super()

        // Initialize the state,
        // State is an object {},
        // PostList is an array []
        this.state = {
            postList: []
        }
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
                    postList: data
                })
            })
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        // Slices/take only 5 items out of the original Array
        // Map only works for Arrays
        const dataIn = this.state.postList.slice(0,5).map(item => {
            // postList is passed as an item.
            return (
                    // Pass values of the state to the component as a prop.
                    <ListData key={item.id} title={item.title} description={item.body} />
            )
        })


        return (
            <main>
                <div className="inner">
                    <div className="taskList">
                        { dataIn }
                    </div>
                </div>
            </main>
        )
    }
}

export default TopContent