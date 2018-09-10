// 'use strict';

var bookNamespace = {

  setClickListeners : function() {

    $('#book').click(function () {
      $('.card').hide();
      $('.bookPage').fadeIn('slow');
      $(".bookForm").show();
      $(".book-checkout-form").show();
      $(".book-return-form").hide();

    });

    $('#bookHomeLanding').click(function () {
      $('.bookPage').fadeIn('slow');

    });


    $('.bookSearchMsg').click(function () {
      $(".book-checkout-form").hide();
      $(".book-return-form").hide();
      $('.book-search-form').animate({
          height: 'toggle',
          opacity: 'toggle'
      }, 'slow');
    });

    $('.bookCheckoutMsg').click(function () {
      $(".book-search-form").hide();
      $(".book-return-form").hide();
      $('.book-checkout-form').animate({
          height: 'toggle',
          opacity: 'toggle'
      }, 'slow');
    });

    $('.bookReturnMsg').click(function () {
      $(".book-checkout-form").hide();
      $(".book-search-form").hide();
      $('.book-return-form').animate({
          height: 'toggle',
          opacity: 'toggle'
      }, 'slow');
    });

    $('.bookAddMsg').click(function () {
      $(".book-delete-form").hide();
      $(".book-remind-form").hide();
        $('.book-add-form').animate({
          height: 'toggle',
          opacity: 'toggle'
      }, 'slow');
    });

      $('.bookRemindMsg').click(function () {
          $(".book-delete-form").hide();
          $(".book-add-form").hide();
          $('.book-remind-form').animate({
              height: 'toggle',
              opacity: 'toggle'
          }, 'slow');
      });

    $('.bookDeleteMsg').click(function () {
      $(".book-add-form").hide();
      $(".book-remind-form").hide();
        $('.book-delete-form').animate({
          height: 'toggle',
          opacity: 'toggle'
      }, 'slow');
    });

    $('#checkoutBook').click(function () {
        event.preventDefault();

        var bookId = $('#bookIdEnter').val();

        var issueDate = new Date();
        var issueTimeStamp = issueDate.getTime();
        var returnTimestamp = issueTimeStamp + (86400 * 10 * 10 * 10 *14);
        var returnDate = new Date(returnTimestamp);

        var userId = getUserId();

        var payload = {
          userid : userId,
          bookid : bookId,
          date_issued : utils.dateToString(issueDate),
          expected_return_date : utils.dateToString(returnDate)
        };

        var callback = function(responseText){
          try {
            var loanInfo = JSON.parse(responseText);
          } catch (e) {
            alert("Sorry, it seems something went wrong. Try Again.");
            $("#loading").hide();
            return;
          }
          if (responseText.indexOf("loaned") > -1){
              alert("Sorry, this book has been checked out");
              return;
          }
          userNamespace.setProfileValues();
          alert("You have checked out the book!");
        };

        endpointsNamespace.createLoanedBook(callback, bookId, userId, payload);


    });

    $('#searchBooks').click(function () {
        event.preventDefault();

        var startDate = $('#startdate').val();
        var endDate = $('#enddate').val();
        var genre = $('#genre').val();
        var firstName = $('#authorFirstName').val();
        var lastName = $('#authorLastName').val();

        var payload = {
          startdate : startDate,
          enddate : endDate,
          genre : genre,
          authorid : 1
        };

        var callback = function(responseText) {
          try {
            var listOfBooks = JSON.parse(responseText);
          } catch (e) {
            alert("Sorry, it seems something went wrong. Try Again.");
            $("#loading").hide();
            return;
          }
          $(".bookForm").hide();
          const container = document.getElementById('bookSearchPage')
          listOfBooks.forEach(book => {
            const card = document.createElement('div');
            //var newContent = document.createTextNode("Title: "+ book.bookname + "\nBook Id:" + book.bookid);
            card.innerHTML = 'Book Name: ' + book.bookname + '</br> Book Id: '
            + book.bookid + '</br> Genre: ' + book.genre + '</br> Publish Date: '
            + book.published_date;
            card.setAttribute('class', 'card');
            //card.appendChild(newContent);
            container.appendChild(card);
          })



          console.log(listOfBooks);

        };

        endpointsNamespace.searchBook(callback, payload);

    });

    $('#addBook').click(function () {
        event.preventDefault();

        // TODO: This is the wrong information. Fix it.
        // Also, note that it is impossible to ever get an authorid
        // unless we query for all books that ever existed. Thats too
        // much.
        // Talk to other team. The author name should be enough.
        // It also appears that there are no books in their database.


        var bookName = $('#bookName').val();
        var genre = $('#genre').val();
        var authorFirstName = $('#authorFirstName').val();
        var authorLastName = $('#authorLastName').val();
        var publishDate = $('#publishDate').val();

        var userId = getUserId();

        if (!(bookName && genre && authorFirstName
          && authorLastName && publishDate)) {
          alert("Please enter all the fields!");
          return;
        }
        var authorId = utils.authorNameToId(authorFirstName, authorLastName);
        var payload = {
          bookname : bookName,
          userid: userId,
          genre : genre,
          authorid: Number(authorId),
          published_date: publishDate
        };

        var callback = function(responseText){
          try {
            var bookInfo = JSON.parse(responseText);
          } catch (e) {
            alert("Sorry, it seems something went wrong. Try Again.");
            $("#loading").hide();
            return;
          }
          alert("Book created!");
        };

        endpointsNamespace.createNewBook(callback, payload);
    });

    $('#deleteBook').click(function () {
        event.preventDefault();

        var bookId = $('#bookId').val();

        var callback = function(responseText){
          try {
            var bookInfo = JSON.parse(responseText);
          } catch (e) {
            alert("Sorry, it seems something went wrong. Try Again.");
            $("#loading").hide();
            return;
          }
          if (responseText.indexOf("not found") > -1){
            alert("This book does not exist");
            return;
          }
          alert("Book Deleted!");
        };

        endpointsNamespace.deleteBookById(callback, bookId);
      });

      $('#returnBook').click(function () {
          event.preventDefault();

          var bookId = $('#returnId').val();
          var loanId = $('#loanId').val();
          var date = new Date();
          var dateString = utils.dateToString(date);

          var payload = {
            date_returned : dateString
          };

          var callback = function(responseText){
            try {
              var bookInfo = JSON.parse(responseText);
            } catch (e) {
              alert("Sorry, it seems something went wrong. Try Again.");
              $("#loading").hide();
              return;
            }
            if (responseText.indexOf("not found") > -1){
              alert("This book is not loaned");
              return;
            }
            userNamespace.setProfileValues();
            alert("Book Returned!");
          };

          endpointsNamespace.returnLoanedBook(callback, bookId, loanId, payload);
        });

      $('#remindUser').click(function () {
          event.preventDefault();

          var remindLoanId =  $('#remindLoanId').val();

          var callback = function(responseText){
              try {
                  var remindInfo = JSON.parse(responseText);
              } catch (e) {
                  alert("Sorry, it seems something went wrong. Try Again.");
                  $("#loading").hide();
                  return;
              }
              if (responseText.indexOf("not found") > -1){
                  alert("This loan ID does not exist");
                  return;
              }
              alert("Reminder Sent!");
          };

          endpointsNamespace.remindLoanedBook(callback, remindLoanId);
      });

      $('#remindAllUsers').click(function () {
          event.preventDefault();

          var callback = function(responseText){
              try {
                  var remindInfo = JSON.parse(responseText);
              } catch (e) {
                  alert("Sorry, it seems something went wrong. Try Again.");
                  $("#loading").hide();
                  return;
              }
              if (responseText.indexOf("not found") > -1){
                  alert("This loan ID does not exist");
                  return;
              }
              alert("All Reminders Sent!!");
          };

          endpointsNamespace.remindAllLoanedBooks(callback);
      });

      $('#submitNote').click(function () {
          event.preventDefault();

          var callback = function(responseText){
              try {
                  var noteResponse = JSON.parse(responseText);
                  console.log(noteResponse);
              } catch (e) {
                  alert("Sorry, it seems something went wrong. Try Again.");
                  $("#loading").hide();
                  return;
              }
              if (responseText.indexOf("not found") > -1){
                  alert("This loan ID does not exist");
                  return;
              }
              alert("Note Added!!");
              userNamespace.setProfileNotes();
          };

          var request = {
              comment: $('#bookNoteInfo').val()
          }

          var bookid = $('#bookIDNoteField').val();
          var noteid = $('#noteNumber').val();

          endpointsNamespace.createBookNote(callback, bookid, noteid, request);
      });

      $('#updateNote').click(function () {
          event.preventDefault();

          var callback = function(responseText){
              try {
                  var noteResponse = JSON.parse(responseText);
                  console.log(noteResponse);
              } catch (e) {
                  alert("Sorry, it seems something went wrong. Try Again.");
                  $("#loading").hide();
                  return;
              }
              if (responseText.indexOf("not found") > -1){
                  alert("This loan ID does not exist");
                  return;
              }
              alert("Note Updated!!");
              userNamespace.setProfileNotes();
          };

          var request = {
              comment: $('#bookNoteInfo').val()
          }

          var bookid = $('#bookIDNoteField').val();
          var noteid = $('#noteNumber').val();

          endpointsNamespace.updateBookNote(callback, bookid, noteid, request);
      });

      $('#deleteNote').click(function () {
          event.preventDefault();

          var callback = function(responseText){
              try {
                  var noteResponse = JSON.parse(responseText);
                  console.log(noteResponse);
              } catch (e) {
                  alert("Sorry, it seems something went wrong. Try Again.");
                  $("#loading").hide();
                  return;
              }
              if (responseText.indexOf("not found") > -1){
                  alert("This note does not exist");
                  return;
              }
              alert("Note Deleted!");
              userNamespace.setProfileNotes();
          };

          var bookid = $('#bookIDNoteField').val();
          var noteid = $('#noteNumber').val();

          endpointsNamespace.deleteBookNote(callback, bookid, noteid);
      });


  }



};

// DO NOT ADD FUNCTIONS HERE. THIS IS THE GLOBAL SCOPE. PLEASE ADD
// FUNCTIONS TO ENDPOINTS OBJECT ABOVE OR CREATE A NEW NAMESPACE OBJECT.
