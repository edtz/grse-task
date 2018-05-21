import React from 'react';

export const UserDetail = props => {
    const user = props.user || {};
    return (
        <ul>
            {Object.entries(user)
                .map(prop => (<li key={prop[0]}>{prop[0]}: {prop[1]}</li>))
            }
        </ul>
    );
};