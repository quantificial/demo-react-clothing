import React from 'react';
import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss'

const CollectionPreview = ({title, items}) => {
    return (
        <div className='collection-preview'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <div className='preview'>
                {
                    items
                    .filter((item,idx) => idx < 4) // only to show 4 items
                    .map(({id, ...otherItemProps})=> (
                        <CollectionItem key={id} {...otherItemProps} />
                    ))
                }

            </div>
        </div>
    )
}

export default CollectionPreview;