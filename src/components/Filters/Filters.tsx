import React from 'react';
import {FilterType, Sort_By_type} from '../App';
import FilterPagination from './FilterPagination/FilterPagination';
import Select from './Select/Select';

type FiltersType = {
    filters: FilterType
    changeFilters: (value: Sort_By_type, name: string) => void;
    page: number
    onChangePage: (value: number) => void
}

export default class Filters extends React.Component<FiltersType, {}> {


    render() {
        const {page, onChangePage, filters, changeFilters} = this.props;
        return (
            <form className="mb-3">
                <Select changeFilters={changeFilters} filters={filters}/>
                <FilterPagination page={page} onChangePage={onChangePage}/>
            </form>
        );
    }
}
