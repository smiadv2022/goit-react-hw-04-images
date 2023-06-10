import React from 'react';
import { Button } from './Button/Button.styled';
import { Container, Message } from './Styles.styled';
import { SearchbarForm } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchGallery } from './Api/ApiGallery';
import { Modal } from './Modal/Modal';
// import { swal } from 'sweetalert';

export class App extends React.Component {
  state = {
    search: '',
    page: 1,
    perPage: 12,
    totalPages: 0,
    images: [],
    error: null,
    isLoading: false,
    modalImage: {},
    showModal: false,
  };

  async componentDidUpdate(_, prevState) {
    const { search, page, perPage } = this.state;


    if (page !== prevState.page || search !== prevState.search) {
      this.setState({ isLoading: true });
      try {
        const response = await fetchGallery({ search, page, perPage });

        if (response.hits.length === 0) {
          throw new Error(`Sorry, no photo from: "${search}!"`);
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          totalPages: Math.ceil(response.totalHits / perPage),
          error: null,
        }));
      } catch (error) {
        this.setState({ error: error.message, isLoading: false });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleOpenModal = image => {
    const modalImage = { url: image.largeImageURL, alt: image.tags };
    this.setState({ modalImage, showModal: true });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  handleSearch = searchText => {
    this.setState({
      search: searchText,
      page: 1,
      perPage: 12,
      totalPages: 0,
      images: [],
      error: null,
      isLoading: false,
      modalImage: {},
      showModal: false,
    });
  };
  render() {
    const {
      images,
      showModal,
      modalImage,
      page,
      totalPages,
      isLoading,
      error,
    } = this.state;
    const showLoadMoreButton = images.length !== 0 && page < totalPages;
    return (
      <Container>
        <SearchbarForm onSubmit={this.handleSearch} />

        <ImageGallery
          images={this.state.images}
          handleOpenModal={this.handleOpenModal}
        />
        {showLoadMoreButton && (
          <Button onClick={this.handleLoadMore} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        )}
        {showModal && (
          <Modal image={modalImage} onModalClick={this.handleCloseModal} />
        )}
        {error && <Message>{error}</Message>}
      </Container>
    );
  }
}
