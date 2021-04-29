import React from 'react';

type TotalPagesPropsType = {
    page: number
    totalPages: null | number
}
const TotalPages: React.FC<TotalPagesPropsType> = React.memo(({totalPages, page}) => {
    console.log('TotalPages')
    return (
        <div className={'ml-1 col-xl-4'}>
            <span className={'ml-3'}
                  style={{display: 'inline-block', paddingTop: '6px'}}>Page <b>{page}</b> of <b>{totalPages}</b></span>
        </div>
    );
});

export default TotalPages;