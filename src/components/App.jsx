import React, { useState, useEffect } from 'react';
import { Button } from './Button/Button.styled';
import { Container, Message } from './Styles.styled';
import { SearchbarForm } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchGallery } from './Api/ApiGallery';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = searchText => {
    console.log(searchText, 'sbar', search);
    setSearch(searchText);
    setPage(1);
    setTotalPages(0);
    setImages([]);
    setError(null);
    setIsLoading(false);
    setShowModal(false);
    setModalImage({});
    console.log(searchText, 'sss', search);
  };
  const perPage = 12;

  useEffect(() => {
    const fnFetch = async () => {
      if (page !== 1 || search !== '') {
        setIsLoading(true);
        try {
          const response = await fetchGallery({ search, page, perPage });
          console.log(search, 'rrr', response.hits);
          if (response.hits.length === 0) {
            toast.info('Change filter');
            throw new Error(`Sorry, no photo from: "${search}!"`);
          }
          setImages(prevImages => [...prevImages, ...response.hits]);
          setTotalPages(Math.ceil(response.totalHits / 12));
          setError(null);
        } catch (error) {
          // toast.info('Sorry, no photo from: "${search}!"');
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fnFetch();
  }, [search, page]);

  const handleOpenModal = image => {
    const modalImage = { url: image.largeImageURL, alt: image.tags };
    setModalImage(modalImage);
    setShowModal(true);
    // setShowModal(prevShowModal => !prevShowModal);
    console.log('modalimg', modalImage, 'sh-', showModal);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    // setShowModal(prevShowModal => !prevShowModal);
  };
  const showLoadMoreButton = images.length !== 0 && page < totalPages;
  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  return (
    <Container>
      <SearchbarForm onSubmit={handleSearch} />
      <ImageGallery images={images} openModal={handleOpenModal} />
      {showLoadMoreButton && (
        <Button onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </Button>
      )}
      {showModal && (
        <Modal image={modalImage} onModalClick={handleCloseModal} />
      )}
      {error && <Message>{error} </Message>}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};

//   async componentDidUpdate(_, prevState) {
//     const { search, page, perPage } = this.state;

//     if (page !== prevState.page || search !== prevState.search) {
//       this.setState({ isLoading: true });
//       try {
//         const response = await fetchGallery({ search, page, perPage });

//         if (response.hits.length === 0) {
//           toast.info('Change filter');
//           throw new Error(`Sorry, no photo from: "${search}!"`);
//         }
//         this.setState(prevState => ({
//           images: [...prevState.images, ...response.hits],
//           totalPages: Math.ceil(response.totalHits / perPage),
//           error: null,
//         }));
//       } catch (error) {
//         this.setState({ error: error.message, isLoading: false });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }
//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   handleOpenModal = image => {
//     const modalImage = { url: image.largeImageURL, alt: image.tags };
//     this.setState({ modalImage, showModal: true });
//   };
//   handleCloseModal = () => {
//     this.setState({ showModal: false });
//   };
//   handleSearch = searchText => {
//     this.setState({
//       search: searchText,
//       page: 1,
//       perPage: 12,
//       totalPages: 0,
//       images: [],
//       error: null,
//       isLoading: false,
//       modalImage: {},
//       showModal: false,
//     });
//   };
//   render() {
//     const {
//       images,
//       showModal,
//       modalImage,
//       page,
//       totalPages,
//       isLoading,
//       error,
//     } = this.state;
//     const showLoadMoreButton = images.length !== 0 && page < totalPages;
//     return (
//       <Container>
//         <SearchbarForm onSubmit={this.handleSearch} />

//         {/* <ImageGallery
//           images={this.state.images}
//           handleOpenModal={this.handleOpenModal}
//         />
//         {showLoadMoreButton && (
//           <Button onClick={this.handleLoadMore} disabled={isLoading}>
//             {isLoading ? 'Loading...' : 'Load More'}
//           </Button>
//         )}
//         {showModal && (
//           <Modal image={modalImage} onModalClick={this.handleCloseModal} />
//         )}
//         {error && <Message>{error} </Message>}
//         <ToastContainer
//           position="top-right"
//           autoClose={2000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         /> */}
//       </Container>
//     );
//   }
// }
