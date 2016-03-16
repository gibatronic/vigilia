!function() {
  var token = 'e03d8b2742dd432967937c3a37739659ff5f2e3e';

  var error = function(exception) {
    console.error(exception);
  };

  var getReadMe = function() {
    var request = new Request('https://api.github.com/repos/gibatronic/vigilia/readme', {
      headers: new Headers({
        'Authorization': 'token ' + token
      })
    });

    return fetch(request);
  };

  var main = function() {
    getReadMe().then(parseJSON)
               .then(parseContent)
               .then(parseMarkdown)
               .then(parseText)
               .then(render)
               .catch(error);
  };

  var parseContent = function(data) {
    return atob(data.content);
  };

  var parseJSON = function(response) {
    return response.json();
  };

  var parseText = function(response) {
    return response.text();
  };

  var parseMarkdown = function(text) {
    var request = new Request('https://api.github.com/markdown', {
      body: JSON.stringify({
        mode: 'markdown',
        text: text
      }),
      headers: new Headers({
        'Authorization': 'token ' + token,
        'Content-Type': 'application/vnd.github.v3+json'
      }),
      method: 'POST'
    });

    return fetch(request);
  };

  var render = function(html) {
    var article = document.createElement('article');

    article.insertAdjacentHTML('beforeend', html);
    document.body.appendChild(article);

    watchImages();
  };

  var show = function() {
    document.body.classList.remove('loading');
  };

  var watchImage = function(image) {
    var executor = function(resolve) {
      image.addEventListener('error', resolve);
      image.addEventListener('load', resolve);
    };

    return new Promise(executor);
  };

  var watchImages = function() {
    var images = Array.from(document.querySelectorAll('article img'));

    Promise.all(images.map(watchImage)).then(show);
  };

  if (document.readyState == 'loading') {
    return document.addEventListener('DOMContentLoaded', main);
  }

  main();
}();
