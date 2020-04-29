import React from 'react'

export default class ListData extends React.Component {
    render() {
        return(
            <div className="taskList__item">
                <div className="title">{this.props.title}</div>
                <div className="description">{this.props.description}</div>
            </div>
        )
    }
}