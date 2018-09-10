var REST_API_HOSTNAME = "https://book-project-team3.herokuapp.com/";

var endpointsNamespace = {

  // User endpoints

  getAllUsers : function(callback) {
    let method = "GET";
    let url = REST_API_HOSTNAME +"users";
    let data = undefined;
    make_rest_call(callback, method, url, data);
  },

  createNewUser : function(callback, request) {
    let method = "POST";
    let url = REST_API_HOSTNAME+"users";
    make_rest_call(callback, method, url, request);
  },


  userById : function(callback, userId) {
    let method = "GET";
    let url = REST_API_HOSTNAME+"users/" + userId;
    let data = undefined;
    make_rest_call(callback, method, url, data);
  },

  // Book Endpoints

    getAllBooks : function(callback) {
      let method = "GET";
      let url = REST_API_HOSTNAME+"books";
      let data = undefined;
      make_rest_call(callback, method, url, data)
    },

    createNewBook : function(callback, request) {
      let method = "POST";
      let url = REST_API_HOSTNAME+"books";
      make_rest_call(callback, method, url, request)
    },

    getAllLoanedBooks : function(callback, request) {
      let method = "GET";
      let url = REST_API_HOSTNAME+"books/loaned";
      make_rest_call(callback, method, url, request)
    },

    searchBook : function(callback, request) {
      let method = "GET";

      let url = REST_API_HOSTNAME+"books/search?";

      for (var key in request) {
        if (request.hasOwnProperty(key)) {
          if (request[key]){
            url += key + "=" + request[key] + "&";
          }
        }
      }
      url = url.substring(0, url.length - 1);

      request = undefined;
      make_rest_call(callback, method, url, request);
    },

    updateBookById : function(callback, bookId, request) {
      let method = "PUT";
      let url = REST_API_HOSTNAME+ "books/" + bookId;
      make_rest_call(callback, method, url, request);
    },

    deleteBookById : function(callback, bookId) {
      let method = "DELETE";
      let url = REST_API_HOSTNAME+"books/"+ bookId;
      let data = undefined;
      make_rest_call(callback, method, url, data);
    },

    getBookById : function(callback, bookId) {
      let method = "GET";
      let url = REST_API_HOSTNAME+"books/" + bookId;
      make_rest_call(callback, method, url, data);
    },

    createLoanedBook : function(callback, bookId, userId, request) {
      let method = "POST";
      let url = REST_API_HOSTNAME+"books/" + bookId +
        "/loaned/" + userId;
        make_rest_call(callback, method, url, request);
    },

    returnLoanedBook : function(callback, bookId, loanId, request) {
      let method = "PUT";
      let url = REST_API_HOSTNAME+"books/" + bookId +
        "/returned/" + loanId;
      make_rest_call(callback, method, url, request);
    },

    // Book Endpoints

    getBookNote : function(callback, bookId) {
      let method = "GET";
      let url = REST_API_HOSTNAME+"books/" + bookId + "/note";
      let data = undefined;
      make_rest_call(callback, method, url, data);
    },

    createBookNote : function(callback, bookId, noteId, request) {
      let method = "POST";
      let url = REST_API_HOSTNAME+"books/" + bookId + "/note";
      make_rest_call(callback, method, url, request);
    },

    updateBookNote : function(callback, bookId, noteId, request) {
      let method = "PUT";
      let url = REST_API_HOSTNAME+"books/" + bookId + "/note/" + noteId;
      make_rest_call(callback, method, url, request);
    },

    deleteBookNote : function(callback, bookId, noteId) {
      let method = "DELETE";
      let url = REST_API_HOSTNAME+"books/" + bookId + "/note/" + noteId;
      let data = undefined;
      make_rest_call(callback, method, url, data);
    },

    // Loaned book endpoints

    getAllLoanedBooks : function(callback) {
      let method = "GET";
      let url = REST_API_HOSTNAME+"loanedbooks/all";
      let data = undefined;
      make_rest_call(callback, method, url, data);
    },

    remindLoanedBook : function(callback, loanId) {
      let method = "GET";
      let url = REST_API_HOSTNAME+"loanedbooks/remind/" + loanId;
      request = undefined;
      make_rest_call(callback, method, url, request);
    },

    remindAllLoanedBooks : function(callback) {
      let method = "GET";
      let url = REST_API_HOSTNAME+"loanedbooks/remindall";
      request = undefined;
      make_rest_call(callback, method, url, request);
    },

    getLoanedBooks : function(callback, userId) {
      let method = "GET";
      let url = REST_API_HOSTNAME+"loanedbooks/" + userId;
      request = undefined;
      make_rest_call(callback, method, url, request);
    },

    // Author endpoints

    getAllAuthors : function(callback) {
      let method = "GET";
      let url = REST_API_HOSTNAME+"authors";
      request = undefined;
      make_rest_call(callback, method, url, request);
    },

    createAuthor : function(callback, request) {
      let method = "POST";
      let url = REST_API_HOSTNAME+"authors";
      make_rest_call(callback, method, url, request);
    },

    updateAuthor : function(callback, authorId, request) {
      let method = "PUT";
      let url = REST_API_HOSTNAME+"authors/" + authorId;
      make_rest_call(callback, method, url, request);
    },

    deleteAuthor : function(callback, authorId) {
      let method = "DELETE";
      let url = REST_API_HOSTNAME + "authors/" + authorId;
      request = undefined;
      make_rest_call(callback, method, url, request);
    },

    getAuthor : function(callback, authorId) {
      let method = "GET";
      let url = REST_API_HOSTNAME + "authors/" + authorId;
      request = undefined;
      make_rest_call(callback, method, url, request);
    },

    // Favorite endpoints

    createFavoriteBook : function(callback, request) {
      let method = "GET";
      let url = REST_API_HOSTNAME + "favorite";
      make_rest_call(callback, method, url, request)
    },

    deleteFavoriteBook : function(callback, favoriteId) {
      let method = "DELETE";
      let url = REST_API_HOSTNAME + "favorite/" + favoriteId;
      let data = undefined;
      make_rest_call(callback, method, url, data)
    },

    getFavoriteList : function(callback, favoriteId) {
      let method = "GET";
      let url = REST_API_HOSTNAME + "favorite/" + favoriteId + "book";
      let data = undefined;
      make_rest_call(callback, method, url, data);
    },

    deleteFavoriteBookFromList : function(callback, favoriteId, bookId) {
      let method = "DELETE";
      let url = REST_API_HOSTNAME + "favorite/" + favoriteId + "book/" + bookId;
      let data = undefined;
      make_rest_call(callback, method, url, data);
    },

    addFavoriteBookToList : function(callback, favoriteId, bookId) {
      let method = "POST";
      let url = REST_API_HOSTNAME + "favorite/" + favoriteId + "book/" + bookId;
      let data = undefined;
      make_rest_call(callback, method, url, data);
    }

};


/*
  * Makes an HTTP request to some url.
  * This function is PRIVATE please do not call this function
  * outside of this module. Please.
  *
  * callabck: A function that should have one paramter
  * method: HTTP method -> https://goo.gl/8XFv3q
  * url:  The hostname plus its endpoint -> www.blah.com/users
  * data: Javascript object
*/
function make_rest_call(callback, method, url, data) {
  console.log("Make REST call to: " + url);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    var responseReceived = 4;  // Request sent and response received
    if (this.readyState === responseReceived) {
      // It is up to the callback function to determine if the
      // request was successful or not based on the response text.
      // For example, if the callback is expecting an object but
      // the responseText could not be parsed to an object then the
      // request was probably a failure.
      console.log(this.responseText);
      callback(this.responseText);
    }
  };
  xhttp.open(method, url, /*async=*/true);
  if (data) {
    xhttp.setRequestHeader("Content-type", "application/json");
  }
  xhttp.send(JSON.stringify(data));
}

// DO NOT ADD FUNCTIONS HERE. THIS IS THE GLOBAL SCOPE. PLEASE ADD
// FUNCTIONS TO ENDPOINTS OBJECT ABOVE OR CREATE A NEW NAMESPACE OBJECT.
