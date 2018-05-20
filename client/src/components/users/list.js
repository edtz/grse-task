import React from "react";

export const UserList = props => {
    const users = props.users || [];
    const handleClick = props.selectUser || (() => {});
    return (
        <ul>
            {users.map(user => (
                <li
                    key={user.username}
                    className={user.status === "online" ? "online" : "offline"}
                    onClick={() => handleClick(user)}
                >
                    {user.username}
                </li>
            ))}
        </ul>
    );
};
