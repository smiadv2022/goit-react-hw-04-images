import React, { useState } from 'react';
// import swal from 'sweetalert';
import { FcSearch } from 'react-icons/fc';

import {
  Searchbar,
  SearchForm,
  SearchFormLabel,
  SearchFormInput,
  SearchFormButton,
} from './Searchbar.styled';

export const SearchbarForm = ({ onSubmit }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = e => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchText.trim() === '') {
      return;
    }
    onSubmit(searchText);

    setSearchText('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        {' '}
        <SearchFormLabel></SearchFormLabel>
        <SearchFormInput
          type="text"
          autocomplete="off"
          placeholder="Search images and
            photos"
          onChange={handleChange}
          value={searchText}
        ></SearchFormInput>{' '}
        <SearchFormButton>
          <FcSearch />
        </SearchFormButton>
      </SearchForm>
    </Searchbar>
  );
};

// export class SearchbarForm extends React.Component {
//   state = {
//     searchText: '',
//   };
//   handleChange = e => {
//     this.setState({ searchText: e.target.value.toLowerCase() });
//   };
//   handleSubmit = e => {
//     e.preventDefault();
//     if (this.state.searchText.trim() === '') {
//       return;
//     }
//     this.props.onSubmit(this.state.searchText);

//     this.setState({ searchText: '' });
//   };
//   render() {
//     return (
//       <Searchbar>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchFormLabel></SearchFormLabel>
//           <SearchFormInput
//             type="text"
//             autocomplete="off"
//             placeholder="Search images and
//             photos"
//             onChange={this.handleChange}
//             value={this.state.searchText}
//           ></SearchFormInput>
//           <SearchFormButton>
//             <FcSearch />
//           </SearchFormButton>
//         </SearchForm>
//       </Searchbar>
//     );
//   }
// }
