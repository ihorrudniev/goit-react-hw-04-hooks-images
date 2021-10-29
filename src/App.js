// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import ImageGallery from './components/ImageGallery';
import Searchbar from './components/Searchbar';
import fetchImages from './components/servises/Pixabay';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';

let maxPages = 0;
let bigURL = '';

export default function App() {
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  // let maxPages = 0;
  // let bigURL = '';

  useEffect(
    prev => {
      if (searchValue === '') {
        return;
      } else if (
        (prev !== searchValue && searchValue !== '') ||
        prev !== page
      ) {
        searchImagesHandler();
      }
    },
    [searchValue, page],
  );

  const closeModal = () => {
    bigURL = '';
    setShowModal(false);
  };

  const showImageHandler = imageUrl => () => {
    bigURL = imageUrl;
    setShowModal(true);
  };
  const scrollToHandler = () => {
    const top = document.documentElement.scrollHeight - 150;

    setTimeout(() => {
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }, 300);
  };
  const searchImagesHandler = async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await fetchImages(searchValue, page);

      if (result.total !== 0) {
        maxPages = Math.ceil(result.totalHits / 12);

        setImages(prev => [...prev, ...result.hits]);
      } else {
        toast.info(`По вашему запросу ${searchValue} ничего не найдено!`);
        setImages([]);
      }
    } catch (error) {
      console.error(error);
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  };
  const loadMoreHandler = () => {
    scrollToHandler();
    setPage(() => Math.min(maxPages, page + 1));
  };

  const onSubmitHandler = searchString => {
    maxPages = 0;
    setImages([]);
    setSearchValue(searchString);
    setPage(1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmitHandler} />
      {images.length > 0 && (
        <ImageGallery
          images={images}
          showImageHandler={showImageHandler}
          scrollToHandler={scrollToHandler}
        />
      )}
      {error && <p className="ErrorText">{error}</p>}
      {isLoading && <Loader />}
      {images.length > 0 && <Button loadMoreHandler={loadMoreHandler} />}
      {showModal && <Modal bigURL={bigURL} onClose={closeModal}></Modal>}
      <ToastContainer autoClose={2500} />
    </div>
  );
}

// class App extends Component {
//   state = {
//     images: [],
//     searchValue: '',
//     page: 1,
//     isLoading: false,
//     showModal: false,
//     error: '',
//   };

//   maxPages = 0;
//   bigURL = '';
//   newElementHight = 0;

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       (prevState.searchValue !== this.state.searchValue &&
//         this.state.searchValue !== '') ||
//       prevState.page !== this.state.page
//     ) {
//       this.searchImagesHandler();
//     }
//   }

// closeModal = () => {
//   this.bigURL = '';
//   this.setState({ showModal: false });
// };

// showImageHandler = imageUrl => () => {
//   this.bigURL = imageUrl;
//   this.setState({ showModal: true });
// };

// scrollToHandler = () => {
//   const top = document.documentElement.scrollHeight - 150;

//   setTimeout(() => {
//     window.scrollTo({
//       top,
//       behavior: 'smooth',
//     });
//   }, 300);
// };

// searchImagesHandler = async () => {
//   const { searchValue, page } = this.state;
//   this.setState({ isLoading: true, error: '' });

//   try {
//     const result = await fetchImages(searchValue, page);

//     if (result.total !== 0) {
//       this.maxPages = Math.ceil(result.totalHits / 12);

//       this.setState(({ images }) => ({
//         images: [...images, ...result.hits],
//       }));
//     } else {
//       toast.info(`По вашему запросу ${searchValue} ничего не найдено!`);
//       this.setState(() => ({
//         images: [],
//       }));
//     }
//   } catch (error) {
//     console.error(error);
//     this.setState(() => ({ error: error.toString() }));
//   } finally {
//     this.setState({ isLoading: false });
//   }
// };

//   loadMoreHandler = () => {
//     this.scrollToHandler();
//     this.setState(() => ({
//       page: Math.min(this.maxPages, this.state.page + 1),
//     }));
//   };

// onSubmitHandler = searchString => {
//   this.maxPages = 0;

//   this.setState(() => ({
//     images: [],
//     searchValue: searchString,
//     page: 1,
//   }));
// };

//   render() {
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.onSubmitHandler} />
//         {this.state.error ? (
//           <p className="ErrorText">{this.state.error}</p>
//         ) : (
//           <ImageGallery
//             images={this.state.images}
//             showImageHandler={this.showImageHandler}
//             scrollToHandler={this.scrollToHandler}
//           />
//         )}
//         {this.state.isLoading && <Loader />}
//         {this.state.page < this.maxPages && (
//           <Button loadMoreHandler={this.loadMoreHandler} />
//         )}
//         {this.state.showModal && (
//           <Modal bigURL={this.bigURL} onClose={this.closeModal}></Modal>
//         )}
//         <ToastContainer autoClose={2500} />
//       </div>
//     );
//   }
// }

// export default App;
