import React, {useContext} from 'react';
import Context from '../../context'

export default function BoardTemplate({name, index}) {
    const {setBoardTemplate} = useContext(Context);

    return (
        <button
            className='boardTemplate'
            onClick={() => setBoardTemplate(index)}
        >
            {name}
        </button>
    )
}