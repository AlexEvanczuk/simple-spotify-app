import $ from 'jquery';

// Pulls HTML from Wikipedia Article with a given title
function getArticleWithTitle(artistName, successCallback) {
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    jsonp: 'callback',
    dataType: 'jsonp',
    data: {
      action: 'query',
      prop: 'extracts',
      titles: artistName,
      format: 'json'
    },
    xhrFields: { withCredentials: true },
    success: (response) => {
      if (!(response && response.query && response.query.pages)) {
        console.error('Unexpected Wikipedia response', response); // eslint-disable-line no-console
        return;
      }
      const pages = Object.keys(response.query.pages);
      if (pages.length > 0) {
        const wikipediaArticle = response.query.pages[pages[0]].extract;
        const artistInfo = (wikipediaArticle && wikipediaArticle.length > 100 ?
            wikipediaArticle :
            'No information found on Wikipedia, sorry!');
        successCallback(artistInfo);
      }
    }
  });
}

module.exports = {
  getArticleWithTitle,
};
