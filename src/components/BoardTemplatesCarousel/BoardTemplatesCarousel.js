import React from 'react';
import BoardTemplate from '../BoardTemplate/BoardTemplate'

function BoardTemplatesCarousel(props) {
    return (
        <div className='boardTemplatesCarousel'>
            {props.boardTemplates.map((template, index) =>
                <BoardTemplate
                    key={index}
                    name = {template.name}
                    onClick={() => props.handleOnClickBoardTemplate(index)}
                />
            )}
        </div>
    )
}

export default BoardTemplatesCarousel;