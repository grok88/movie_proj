import React from 'react';

type TotalPagesPropsType = {
    page: number
    totalPages:null | number
}
const TotalPages:React.FC<TotalPagesPropsType> = ({totalPages,page}) => {
    return (
        <div className={'ml-1 tp-1 '} >
            Page <b>{page}</b> of <b>{totalPages}</b>
        </div>
    );
};

export default TotalPages;