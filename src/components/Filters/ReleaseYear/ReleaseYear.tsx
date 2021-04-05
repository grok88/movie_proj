import React, {ChangeEvent, PureComponent} from 'react';

type ReleaseYearPropsType = {
    releaseYear: string
    changeFilters: (value: string, name: string) => void;
}

function getYearsBetween(start: number, end: number) {
    let arr = [];
    for (let i = start; i <= end; i++) {
        arr.push({label: String(i), value: String(i)})
    }
    return arr;
}

type DefaultProps = {
    options: Array<{ label: string, value: string }>
}

class ReleaseYear extends PureComponent<ReleaseYearPropsType, {}> {
    static defaultProps: DefaultProps = {
        options: getYearsBetween(1950, 2025)
    }

    selectValue = (e: ChangeEvent<HTMLSelectElement>) => {
        this.props.changeFilters(e.target.value, e.target.name);
    }

    render() {
        const {releaseYear} = this.props;
        return (
            <div className='form-group'>
                <label htmlFor="primary_release_year">Сортировать по году выпуска:</label>
                <select className="form-control" id="primary_release_year" name="primary_release_year"
                        onChange={this.selectValue}
                        defaultValue={releaseYear}>
                    {
                        ReleaseYear.defaultProps.options.map(option => <option value={option.value}
                                                                               key={option.value}>{option.label}</option>)
                    }

                </select>
            </div>
        );
    }
}

export default ReleaseYear;