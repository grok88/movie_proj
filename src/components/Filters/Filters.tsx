import React, {ChangeEvent} from 'react';
import {FilterType, Sort_By_type} from '../App';

type FiltersType = {
    filters: FilterType
    changeFilters: (value: Sort_By_type, name:string) => void;
    page:number
    onChangePage:(value:number) => void
}

export default class Filters extends React.Component<FiltersType, {}> {

    selectValue = (e: ChangeEvent<HTMLSelectElement>) => {
        this.props.changeFilters(e.target.value as Sort_By_type, e.target.name);
    }

    render() {
        const {page,onChangePage ,filters} = this.props;
        return (
            <form className="mb-3">
                <div className="form-group">
                    <label htmlFor="sort_by">Сортировать по:</label>
                    <select className="form-control" id="sort_by" name="sort_by" onChange={this.selectValue}
                            defaultValue={filters.sort_by}>
                        <option value="popularity.desc">Популярные по убыванию</option>
                        <option value="popularity.asc">Популярные по возростанию</option>
                        <option value="vote_average.desc">Рейтинг по убыванию</option>
                        <option value="vote_average.asc">Рейтинг по возростанию</option>
                    </select>
                </div>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-dark mr-2" onClick={()=>onChangePage(page - 1)} disabled={page === 1}>Назад</button>
                    <button type="button" className="btn btn-dark" onClick={()=>onChangePage(page + 1)}>Вперед</button>
                </div>
            </form>
        );
    }
}
