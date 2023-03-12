import { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { Header, Form, Btn, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = evt => {
    setImageName(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (imageName.trim() === '') {
      alert('Fill out the form, please!');
      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Btn type="submit">
          <AiOutlineSearch />
        </Btn>

        <Input
          type="text"
          name="imageName"
          value={imageName}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
