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
            firstName: '',
            isLoading: true,
        }

        // Requirement to bind function to be called.
        this.handleEnter = this.handleEnter.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    // Fetch Data from JSONPlaceholder
    fetchData() {
        fetch('https://taskette-24f81.firebaseio.com/posts.json')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                // Stores setState to object without function.
                // console.table(data)

                this.setState({
                    postList: data,
                    isLoading: false
                })
            })
    }

    // Create/Post
    handleEnter(event) {
        const { name, value } = event.target
        // If enter key is pressed
        if (event.keyCode === 13) {
            // Prevents default reloading of page upon submission of form.
            event.preventDefault()
            // Set value, but first gets the previous state to pass through the parameter
            // setState is a asynchronous procedure, meaning it happens at the same time.

            fetch('https://taskette-24f81.firebaseio.com/posts.json', {
                    method: 'POST',
                    body: JSON.stringify({
                        // When its a array
                        // id: this.state.postList.length,
                        // When its a object array
                        id: Object.keys(this.state.postList).length + 1,
                        title: value,
                        isChecked: false,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(response => response.json())
                .then(() => {
                    this.fetchData()
                })

            //Dynamically Add items to state List
            // this.setState(prevState => ({
            //     postList: [{
            //         // Get last index id and add +1
            //         id: Object.keys(this.state.postList).length,
            //         title: value,
            //         // Retrieves the previous state of array and adds all/rest of the items
            //     }, ...prevState.postList],
            // }), () => {
            //     // Once finish, log the current state postList array.
            //     console.log(this.state.postList)
            // })
            //Input field value is cleared
            event.target.value = ''
        }
    }

    // Patch - Specific Detail - PUT - Update All Details
    handleDelete(id) {
        // const { name, type, checked } = id
        this.setState(prevState => {
            const objectList = prevState.postList
            const updatedPostList = Object.keys(objectList).map(post => {
                if (objectList[post].id === id) {

                    const idOfPost = `https://taskette-24f81.firebaseio.com/posts/${post}.json`
                    console.log(idOfPost)

                    fetch(idOfPost, {
                        method: 'PATCH',
                        body: JSON.stringify({
                            isChecked: !objectList[post].isChecked
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    .then(response => response.json())
                    .then(() => {
                        this.fetchData()
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                    
                    // return {
                    //     ...objectList[post],
                    //     isChecked: !objectList[post].isChecked
                    // }
                }

                // return objectList[post]
            })

            // return {
            //     postList: updatedPostList
            // }
        })
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        // Slices/take only 5 items out of the original Array
        // Map only works for Arrays unless you use Object.keys

        if (this.state.isLoading) {
            return '...Loading'
        }

        const data = this.state.postList

        // Mapping a Object Array
        const dataIn = Object.keys(data).reverse().map(i => {


            // postList is passed as an item.
            return (
                // Pass values of the state to the component as a prop.
                <ListData 
                    key={data[i].id} 
                    id={data[i].id}
                    title={data[i].title} 
                    isChecked= {data[i].isChecked}
                    handleDelete={this.handleDelete}
                />
            )

        })

        // Mapping a Array and take 0,100
        // const dataInArray = this.state.postList.slice(0, 100).map(item => {
        //     // postList is passed as an item.
        //     return (
        //         // Pass values of the state to the component as a prop.
        //         <ListData key={item.id} title={item.title} />
        //     )
        // })


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