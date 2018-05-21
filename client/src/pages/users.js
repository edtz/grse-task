import React, { Component } from 'react';
import { Users } from "../utils/apiClient"
import { UserList } from "../components/users/list";
import { UserDetail } from "../components/users/detail";

export class UserPage extends Component {
    state = {
        users: [],
        selectedUser: null,
        errors: [],
    }
    constructor(props) {
        super(props);
        this.api = new Users();
        this.api.getList()
            .then(response => this.setState({users: response.payload}))
            .catch(e => this.appendError("Server connection unsuccessful"));
    }
    
    selectUser = user => this.setState({selectedUser: user});
    
    updateUsername = (oldValue, newValue) => {
        this.api.putUser(oldValue, newValue)
            .then(resp => this.setState({users: [
                ...this.state.users.filter(user => user.username !== oldValue),
                resp.payload
            ]}))
            .catch(e => this.appendError(e));
    };
    
    appendError = error => {
        this.setState({errors: [...this.state.errors, {
        id: this.state.errors.length,
        text: error.message,
    }]})};
    
    getErrors() {
        if (this.state.errors.length > 0){
            return (<ul>
                {this.state.errors.map(
                    error => (<li key={error.id}> {error.text} </li>)
                )}
            </ul>);
        }
    }
    
    render() {
        return (
            <div>
                {this.getErrors()}
                <UserList users={this.state.users} selectUser={this.selectUser} updateUsername={this.updateUsername}/>
                {
                    this.state.selectedUser
                        ? <UserDetail user={this.state.selectedUser} />
                        : null
                }
            </div>
        );
    }
}