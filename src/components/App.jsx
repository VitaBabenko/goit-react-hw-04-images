import { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';

export class App extends Component {
  state = {
    imageName: '',
    page: 1,
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName, page: 1 });
  };

  handleButton = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { imageName, page } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          value={imageName}
          page={page}
          handleLoad={this.handleButton}
        />
      </>
    );
  }
}
