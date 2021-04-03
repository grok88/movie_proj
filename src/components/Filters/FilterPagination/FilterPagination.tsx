import React, {Component} from 'react';

type FilterPaginationPropsType = {
    page: number
    onChangePage: (value: number) => void
}

class FilterPagination extends Component<FilterPaginationPropsType, {}> {
    render() {
        const {page, onChangePage} = this.props;
        return <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-dark mr-2" onClick={() => onChangePage(page - 1)}
                    disabled={page === 1}>Назад
            </button>
            <button type="button" className="btn btn-dark" onClick={() => onChangePage(page + 1)}>Вперед
            </button>
        </div>
    }
}

export default FilterPagination;