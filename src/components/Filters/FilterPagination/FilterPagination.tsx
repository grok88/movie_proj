import React, {Component} from 'react';
import TotalPages from '../TotalPages/TotalPages';

type FilterPaginationPropsType = {
    page: number
    onChangePage: (value: number) => void
    totalPages:null | number
}

class FilterPagination extends Component<FilterPaginationPropsType, {}> {
    render() {
        const {page, onChangePage,totalPages} = this.props;
        return <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-dark mr-2" onClick={() => onChangePage(page - 1)}
                    disabled={page === 1}>Назад
            </button>
            <button type="button" className="btn btn-dark" onClick={() => onChangePage(page + 1)}>Вперед
            </button>
            <TotalPages page={page} totalPages={totalPages}/>
        </div>
    }
}

export default FilterPagination;