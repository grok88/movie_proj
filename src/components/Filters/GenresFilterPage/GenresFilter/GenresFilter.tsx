import React, {ChangeEvent, Component, PureComponent} from 'react';
import {GenreType} from '../../../../api/api';

type GenresFilterPropsType = {
    genres: Array<GenreType>
    onGenresChange: (genreId: string) => void
    checked: boolean | undefined
}

class GenresFilter extends PureComponent<GenresFilterPropsType, {}> {

    render() {
        const {genres, checked} = this.props;
        console.log('GenresFilter')
        return (
            <div className='form-group mt-3'>
                {genres.map(g => <GenreCheckbox onGenresChange={this.props.onGenresChange} genre={g} key={g.id}
                                                checked={checked}/>)}
            </div>
        );
    }
}


type GenreCheckboxPropsType = {
    onGenresChange: (genreId: string) => void
    genre: GenreType
    checked: boolean | undefined
}

class GenreCheckbox extends Component<GenreCheckboxPropsType, { checked: boolean }> {

    constructor(props: GenreCheckboxPropsType) {
        super(props);

        this.state = {
            checked: props.checked || false
        }
    }

    onChangeFavorite = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.onGenresChange(event.target.name);
        this.setState({
            checked: event.target.checked
        })
    };

  componentDidUpdate(prevProps: Readonly<GenreCheckboxPropsType>, prevState: Readonly<{ checked: boolean }>, snapshot?: any) {
      if(this.props.checked !== prevProps.checked){
          this.setState({
              checked: false
          })
      }

  }

    render() {
        const g = this.props.genre;

        return <div className="form-check">
            <input className="form-check-input" type="checkbox"
                   checked={this.state.checked}
                   id={String(g.id)} name={String(g.id)}
                   onChange={this.onChangeFavorite}/>
            <label className="form-check-label" htmlFor={String(g.id)}>
                {g.name}
            </label>
        </div>
    }
}


export default GenresFilter;