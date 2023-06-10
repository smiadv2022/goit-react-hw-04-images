import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
  return (
    <Item onClick={onClick}>
      <Image src={webformatURL} alt={tags} loading="lazy" />
    </Item>
  );
};
