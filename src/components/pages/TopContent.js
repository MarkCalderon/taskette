import React from 'react'

import ListData from '../part/ListData'


class TopContent extends React.Component {

    constructor() {
        super()
        this.state = {
            postList: []
        }
    }

    fetchData() {
        fetch('https://jsonplaceholder.typicode.com/posts/')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({
                    postList: data
                })
            })
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {

        const dataIn = this.state.postList.slice(0,5).map(item => {
            return (
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