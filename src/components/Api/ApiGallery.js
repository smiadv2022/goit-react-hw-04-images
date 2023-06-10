const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35628510-01ea92234f245f2047fa1b595';

export async function fetchGallery({ search, page, perPage }) {
  // search = 'cat';
  const response = await fetch(
    `${BASE_URL}?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Smth went wrong...`);
  }
}
