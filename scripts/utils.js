var utils = {

  wait : function(deadlineSec, stepSec, conditionFn) {
    var startTimestamp = (new Date()).getTime();
    var stepMs = stepSec * 1000;
    var deadlineMs = startTimestamp + (deadlineSec * 1000);
    var nextTimestamp = startTimestamp + stepMs;

    while (true) {
      var currTimestamp = (new Date()).getTime();
      if (currTimestamp > deadlineMs) {
        return false;
      }
      if (currTimestamp > nextTimestamp) {
        if (conditionFn()) {
          return true;
        }
        nextTimestamp = currTimestamp + stepMs;
      }
    }
  },

  objectToString : function(object) {
    var str = "";
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        str += key + ":" + object[key] + " ";
      }
    }
    return str;
  },

  authorNameToId : function(firstName, lastName) {
    var callback = function(responseText) {
      try {
        var listOfAuthors= JSON.parse(responseText);
      } catch (e) {
        alert("Sorry, it seems something went wrong. Try Again.");
        localStorage.setItem(TEMP_ERROR_KEY, JSON.stringify(e));
        return;
      }

      var currentAuthor = undefined;
      for (var i = 0; i < listOfAuthors.length; i++) {
        var author = listOfAuthors[i];
        if (author.firstname === firstName && author.lastname === lastName) {
          currentAuthor = author;
          break;
        }
      }

      // If we couldnt find a user from the list of users.
      if (!currentAuthor) {
        alert("Author not Found");
        localStorage.setItem(TEMP_ERROR_KEY, "Not Found");
        return;
      }

      localStorage.setItem(TEMP_INFO_KEY, author.authorid);
    }; // end callback definition

    endpointsNamespace.getAllAuthors(callback);

    this.wait(15, 3, function() {
      return localStorage.getItem(TEMP_INFO_KEY)
      || localStorage.getItem(TEMP_ERROR_KEY);
    });
    if (localStorage.getItem(TEMP_ERROR_KEY)) {
      console.log(localStorage.getItem(TEMP_ERROR_KEY));
      return;
    }

    var authorId = localStorage.getItem(TEMP_INFO_KEY);

    // Clean up
    localStorage.setItem(TEMP_INFO_KEY, "");
    localStorage.setItem(TEMP_ERROR_KEY, "");
    console.log(authorId);
    return authorId;
  },

  dateToString : function(date) {
    var options = {year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString("en-US", options);
  }

};

// DO NOT ADD FUNCTIONS HERE. THIS IS THE GLOBAL SCOPE. PLEASE ADD
// FUNCTIONS TO ENDPOINTS OBJECT ABOVE OR CREATE A NEW NAMESPACE OBJECT.
