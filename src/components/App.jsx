import { useState, useEffect } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { getImage } from '../services/GetImage';
import { Loader } from './loader/Loader';
import { Button } from './button/Button';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    setLoading(true);

    getImage(imageName.trim(), page)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        return Promise.reject(
          new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          )
        );
      })
      .then(images => {
        console.log(images.hits);
        page === 1
          ? setImages(images.hits)
          : setImages(prevImages => [...prevImages, ...images.hits]);
        setTotalHits(images.totalHits);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [imageName, page]);

  // componentDidUpdate(_, prevState) {
  //   const { imageName, page } = this.state;

  //   if (prevState.imageName !== imageName || prevState.page !== page) {
  //     this.setState({
  //       loading: true,
  //     });

  //     getImage(imageName.trim(), page)
  //       .then(resp => {
  //         if (resp.ok) {
  //           return resp.json();
  //         }

  //         return Promise.reject(
  //           new Error(
  //             'Sorry, there are no images matching your search query. Please try again.'
  //           )
  //         );
  //       })
  //       .then(images => {
  //         console.log(images.hits);
  //         return this.setState(() => ({
  //           images:
  //             page === 1 ? images.hits : [...this.state.images, ...images.hits],
  //           totalHits: images.totalHits,
  //         }));
  //       })
  //       .catch(error => this.setState({ error }))
  //       .finally(() => this.setState({ loading: false }));
  //   }
  // }

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
    setTotalHits(null);
  };

  const handleButton = () => {
    setPage(prev => prev.page + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />
      {loading && <Loader />}
      {error && <h1>{error.message}</h1>}
      {images.length < totalHits && <Button onClick={handleButton} />}
      {totalHits === 0 && (
        <h1>
          Sorry, there are no images matching your search query. Please try
          again.
        </h1>
      )}
    </>
  );
};

// export class App extends Component {
//   state = {
//     imageName: '',
//     page: 1,
//     images: [],
//     loading: false,
//     error: null,
//     totalHits: null,
//   };

//   componentDidUpdate(_, prevState) {
//     const { imageName, page } = this.state;

//     if (prevState.imageName !== imageName || prevState.page !== page) {
//       this.setState({
//         loading: true,
//       });

//       getImage(imageName.trim(), page)
//         .then(resp => {
//           if (resp.ok) {
//             return resp.json();
//           }

//           return Promise.reject(
//             new Error(
//               'Sorry, there are no images matching your search query. Please try again.'
//             )
//           );
//         })
//         .then(images => {
//           console.log(images.hits);
//           return this.setState(() => ({
//             images:
//               page === 1 ? images.hits : [...this.state.images, ...images.hits],
//             totalHits: images.totalHits,
//           }));
//         })
//         .catch(error => this.setState({ error }))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   handleFormSubmit = imageName => {
//     this.setState({ imageName, page: 1, images: [], totalHits: null });
//   };

//   handleButton = () => {
//     this.setState(prev => ({ page: prev.page + 1 }));
//   };

//   render() {
//     const { error, images, loading, totalHits } = this.state;

//     return (
//       <>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery images={images} />
//         {loading && <Loader />}
//         {error && <h1>{error.message}</h1>}
//         {images.length < totalHits && <Button onClick={this.handleButton} />}
//         {totalHits === 0 && (
//           <h1>
//             Sorry, there are no images matching your search query. Please try
//             again.
//           </h1>
//         )}
//       </>
//     );
//   }
// }
