import React from 'react';

type TotalPagesPropsType = {
    page: number
    totalPages: null | number
}
const TotalPages: React.FC<TotalPagesPropsType> = React.memo(({totalPages, page}) => {
    return (
        <div className={'ml-1'}>
            <span className={'ml-3'}
                  style={{display: 'inline-block', paddingTop: '6px'}}>Page <b>{page}</b> of <b>{totalPages}</b></span>
        </div>
    );
});

export default TotalPages;