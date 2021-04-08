import React from 'react';
import {FilterType} from '../App';
import FilterPagination from './FilterPagination/FilterPagination';
import Select from './Select/Select';
import ReleaseYear from './ReleaseYear/ReleaseYear';
import GenresFilterPage from './GenresFilterPage/GenresFilterPage';

type FiltersType = {
    filters: FilterType
    changeFilters: (value: string, name: string) => void;
    page: number
    onChangePage: (value: number) => void
    totalPages: null | number
    resetAllFilters: () => void
    onGenresChange : (genreId: string) => void
}

export default class Filters extends React.Component<FiltersType, {}> {


    render() {
        const {page, onChangePage, filters, changeFilters, totalPages, resetAllFilters, onGenresChange} = this.props;
        return (
            <form className="mb-3 ">
                <Select changeFilters={changeFilters} filters={filters}/>
                <ReleaseYear releaseYear={filters.primary_release_year} changeFilters={changeFilters}/>
                <FilterPagination page={page} onChangePage={onChangePage} totalPages={totalPages}/>
                <GenresFilterPage onGenresChange={onGenresChange}/>
                <button type="button" className="btn btn-info mt-3 " style={{width: '100%'}}
                        onClick={resetAllFilters}>Сбросить фильтры
                </button>
            </form>
        );
    }
}
