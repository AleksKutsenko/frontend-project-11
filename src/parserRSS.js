const parseRSS = (response) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(response, 'text/xml');
    const title = doc.querySelector('channel title').textContent;
    const description = doc.querySelector('channel description').textContent;
    const link = doc.querySelector('channel link').textContent;
    const items = doc.querySelectorAll('channel item');

    const arrayOfPosts = [...items].map((item) => {
      const postTitle = item.querySelector('title').textContent;
      const postDescription = item.querySelector('description').textContent;
      const postLink = item.querySelector('link').textContent;
      const postPubDate = item.querySelector('pubDate').textContent;
      return {
        postTitle, postDescription, postLink, postPubDate,
      };
    });
    return { feed: { title, description, link }, posts: arrayOfPosts };
  } catch (e) {
    throw new Error('Parsing RSS Error');
  }
};

export default parseRSS;
