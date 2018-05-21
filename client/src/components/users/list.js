import React from "react";

export class UserList extends React.Component {
    
    render() {
        return (
            <ul>
                {this.props.users.map(user => (
                    <li
                        key={user.username}
                        className={
                            user.status === "online" ? "online" : "offline"
                        }
                    > <UserListItem user={user} onSelect={this.props.selectUser} onChange={this.props.updateUsername} /> 
                    </li>
                ))}
            </ul>
        );
    }
}

class UserListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            newValue: this.props.user.username,
        }
    }
    handleClick(user) {
        this.props.onSelect(user);
    }
    handleChange(){
        this.props.onChange(this.props.user.username, this.state.newValue);
    }
    
    getButtons = () => this.state.isEditing
        ? ([
            <a className={"button"} key={"save"} onClick={e => this.handleChange()}>save</a>,
            <a className={"button"} key={"cancel"} onClick={e => this.setState({
                isEditing: false,
                newValue: this.props.user.username,
            })}>cancel</a>
        ]) : (<a className={"button"} onClick={e => this.setState({isEditing: true})}>rename</a>);
        
    cancelEditing = () => {
        this.setState({});
    };
    
    render() {
        const user = this.props.user;
        return (<span>
            {this.state.isEditing
                ? <input value={this.state.newValue} onChange={e => this.setState({newValue: e.target.value})} />
            : <span className={"username"} onClick={() => this.handleClick(user)}>{user.username}</span>}
            <span>{this.getButtons()}</span>
        </span>);
    }
}
