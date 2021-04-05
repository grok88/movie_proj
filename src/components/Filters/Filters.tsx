import React from 'react';
import {FilterType} from '../App';
import FilterPagination from './FilterPagination/FilterPagination';
import Select from './Select/Select';
import ReleaseYear from './ReleaseYear/ReleaseYear';

type FiltersType = {
    filters: FilterType
    changeFilters: (value: string, name: string) => void;
    page: number
    onChangePage: (value: number) => void
}

export default class Filters extends React.Component<FiltersType, {}> {


    render() {
        const {page, onChangePage, filters, changeFilters} = this.props;
        return (
            <form className="mb-3">
                <Select changeFilters={changeFilters} filters={filters}/>
                <ReleaseYear releaseYear={filters.primary_release_year} changeFilters={changeFilters}/>
                <FilterPagination page={page} onChangePage={onChangePage}/>

            </form>
        );
    }
}
