import React, { Component } from 'react';
import { Users } from "../utils/apiClient"
import { UserList } from "../components/users/list";
import { UserDetail } from "../components/users/detail";

export class UserPage extends Component {
    state = {
        users: [],
        selectedUser: null,
    }
    constructor() {
        super();
        const api = new Users();
        api.getList()
            .then(response => this.setState({users: response.payload}))
            .catch(e => console.log(e));
    }
    
    selectUser = user => this.setState({selectedUser: user});
    
    render() {
        return (
            <div>
                <UserList users={this.state.users} selectUser={this.selectUser}/>
                {
                    this.state.selectedUser
                        ? <UserDetail user={this.state.selectedUser} />
                        : null
                }
            </div>
        );
    }
}