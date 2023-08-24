import React, {Component} from 'react'

class UserFooter extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <footer className="footer">
                    <span className="text-muted">All free</span>
                </footer>
            </div>
        )
    }
}

export default UserFooter
