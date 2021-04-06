import React, {ChangeEvent, Component, PureComponent} from 'react';
import {FilterType, Sort_By_type} from '../../App';

type SelectPropsType = {
    changeFilters: (value: Sort_By_type, name: string) => void;
    filters: FilterType
}

type DefaultProps = {
    options: Array<{ label: string, value: string }>
}

class Select extends PureComponent<SelectPropsType, {}> {
    static defaultProps: DefaultProps = {
        options: [
            {label: 'Популярные по убыванию', value: 'popularity.desc'},
            {label: 'Популярные по возростанию', value: 'popularity.asc'},
            {label: 'Рейтинг по убыванию', value: 'vote_average.desc'},
            {label: 'Рейтинг по возростанию', value: 'vote_average.asc'},
        ]
    }

    selectValue = (e: ChangeEvent<HTMLSelectElement>) => {
        this.props.changeFilters(e.target.value as Sort_By_type, e.target.name);
    }

    render() {
        const {filters} = this.props;
        console.log('Select')
        return <div className="form-group">
            <label htmlFor="sort_by">Сортировать по:</label>
            <select className="form-control" id="sort_by" name="sort_by" onChange={this.selectValue}
                // defaultValue={filters.sort_by}
                    value={filters.sort_by}
            >
                {
                    Select.defaultProps.options.map(option => <option value={option.value}
                                                                      key={option.value}>{option.label}</option>)
                }

            </select>
        </div>
    }
}

export default Select;