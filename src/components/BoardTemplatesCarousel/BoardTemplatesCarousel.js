import React from 'react';
import BoardTemplate from '../BoardTemplate/BoardTemplate'

export default function BoardTemplatesCarousel({boardTemplates}) {
    return (
        <div className='block boardTemplatesCarousel'>
            {boardTemplates.map((template, index) =>
                <BoardTemplate
                    key={index}
                    name = {template.name}
                    index={index}
                />
            )}
        </div>
    )
}