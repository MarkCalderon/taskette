import React from 'react'

export default class ListData extends React.Component {
    render() {
        let taskStatus = 'taskList__item'

        if(this.props.isChecked === true) {
            taskStatus += ' is__cross'
        }

        return(
            <div className={taskStatus}>
                <div className="title">{this.props.title}</div>
                <div className="checkbox">
                    <input type="checkbox" checked={this.props.isChecked} onChange={(event) => this.props.handleDelete(this.props.id)}/>
                    <div className="check"></div>
                </div>
            </div>
        )
    }
}