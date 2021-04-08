import React from 'react';
import Filters from './Filters/Filters';
import MoviesList from './Movies/MoviesList';

export type Sort_By_type = 'popularity.desc' | 'popularity.asc' | 'vote_average.desc' | 'vote_average.asc';
export type FilterType = {
    sort_by: Sort_By_type
    primary_release_year: string
    with_genres: Array<string>
}
export type AppConstructorType = {
    filters: FilterType
    page: number
    total_pages: null | number

}
export default class App extends React.Component<{}, AppConstructorType> {
    constructor(props: {}) {
        super(props);
        this.state = {
            filters: {
                sort_by: 'popularity.desc',
                primary_release_year: '2021',
                with_genres: []
            },
            page: 1,
            total_pages: null
        }
    }

    //Change Filter Type
    changeFilters = (value: string, name: string) => {
        const newFilter = {
            ...this.state.filters,
            [name]: value
        }
        this.setState({
            filters: newFilter
        })
    }

    //Change pageNumber
    onChangePage = (page: number) => {
        this.setState({
            page
        })
    }
    //Change pageNumber
    setTotalPages = (pages: number) => {
        this.setState({
            total_pages: pages
        })
    }
    //Reset All Filters
    resetAllFilters = () => {
        this.setState({
            filters: {
                sort_by: 'popularity.desc',
                primary_release_year: '2021',
                with_genres: []
            },
            page: 1
        })
    }
    //Change GenresFilter
    onGenresChange = (genreId: string) => {
        let genres: Array<string> = [...this.state.filters.with_genres];

        let index = genres.findIndex(el => el === genreId)
        if (index === -1) {
            genres.push(genreId)
        } else {
            genres.splice(index, 1)
        }

        this.setState({
            filters: {
                ...this.state.filters,
                with_genres: genres
            }
        })
    }
    //reset GenresFilter
    onGenresReset = () => {
        this.setState({
            filters: {
                ...this.state.filters,
                with_genres: []
            }
        })
    }

    render() {
        const {filters, page} = this.state;
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="card" style={{width: '100%'}}>
                            <div className="card-body">
                                <h3>Фильтры:</h3>
                                <Filters filters={filters} changeFilters={this.changeFilters} page={page}
                                         onChangePage={this.onChangePage}
                                         totalPages={this.state.total_pages}
                                         resetAllFilters={this.resetAllFilters}
                                         onGenresChange={this.onGenresChange}
                                             onGenresReset={this.onGenresReset}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <MoviesList filters={filters} page={page}
                                    onChangePage={this.onChangePage}
                                    setTotalPages={this.setTotalPages}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
