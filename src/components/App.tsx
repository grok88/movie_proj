import React from 'react';
import Filters from './Filters/Filters';
import MoviesList from './Movies/MoviesList';

export type Sort_By_type = 'popularity.desc' | 'popularity.asc' | 'vote_average.desc' | 'vote_average.asc';
export type FilterType = {
    sort_by: Sort_By_type
}
export type AppConstructorType = {
    filters: FilterType
}
export default class App extends React.Component<{}, AppConstructorType> {
    constructor(props: {}) {
        super(props);
        this.state = {
            filters: {
                sort_by: 'popularity.desc'
            }
        }
    }

    //Change Filter Type
    changeFilters = (value: Sort_By_type, name: string) => {
        const newFilter = {
            ...this.state.filters,
            [name]: value
        }

        this.setState({
            // filters: {
            //     ...prevState.filters,
            //     [name]: value
            // }

            filters: newFilter
        })
    }

    render() {
        const {filters} = this.state;
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="card" style={{width: '100%'}}>
                            <div className="card-body">
                                <h3>Фильтры:</h3>
                                <Filters filters={filters} changeFilters={this.changeFilters}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <MoviesList filters={filters}/>
                    </div>
                </div>
            </div>
        );
    }
}
