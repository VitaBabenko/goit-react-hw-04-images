import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Header, Form, Btn, Input } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = evt => {
    this.setState({ imageName: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { imageName } = this.state;

    if (imageName.trim() === '') {
      alert('Fill out the form, please!');
      return;
    }

    this.props.onSubmit(imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Btn type="submit">
            <AiOutlineSearch />
          </Btn>

          <Input
            type="text"
            name="imageName"
            value={this.state.imageName}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </Form>
      </Header>
    );
  }
}
