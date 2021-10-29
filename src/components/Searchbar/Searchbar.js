import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const changeHandler = e => {
    setValue(e.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();

    if (value.trim() === '') {
      toast.error('Please enter search request!');
      return;
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={submitHandler}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={changeHandler}
          value={value}
        />
      </form>
    </header>
  );
}

// class Searchbar extends Component {
//   state = {
//     value: '',
//   };

//   changeHandler = e => {
//     this.setState({ value: e.target.value });
//   };

//   submitHandler = event => {
//     event.preventDefault();

//     if (this.state.value.trim() === '') {
//       toast.error('Please enter search request!');
//       return;
//     }
//     this.props.onSubmit(this.state.value);
//     this.setState({ value: '' });
//   };

//   render() {
//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={this.submitHandler}>
//           <button type="submit" className="SearchForm-button">
//             <span className="SearchForm-button-label">Search</span>
//           </button>

//           <input
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.changeHandler}
//             value={this.state.value}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// export default Searchbar;
