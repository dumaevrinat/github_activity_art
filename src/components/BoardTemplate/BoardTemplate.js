import React from 'react';

function BoardTemplate(props) {
    return (
        <button
            className='boardTemplate'
            onClick={props.onClick}
        >
            {props.name}
        </button>
    )
}

export default BoardTemplate;