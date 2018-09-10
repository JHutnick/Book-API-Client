// 'use strict';

var userNamespace = {

    setProfileValues : function() {
        let user = JSON.parse(localStorage.getItem('currentUserInfo'));

        var callback = function(responseText){
            try {
                localStorage.setItem("listOfBooks", responseText);
                var listOfBooks = JSON.parse(responseText);

            } catch (e) {
                alert("Sorry, it seems something went wrong. Try Again.");
                // $("#loading").hide();
                return;
            }
            // console.log(listOfBooks);

            var myBooks = "Your loaned books: \n";

            for(var book in listOfBooks){
                myBooks = myBooks + "Loan #: " + listOfBooks[book].loanid + "\nBook ID: " + listOfBooks[book].bookid
                + "  Due Date: " + listOfBooks[book].expected_return_date + " \n\n";
            }

            $('#loanedBooksList').val(myBooks);
        };
        // console.log(user);

        endpointsNamespace.getLoanedBooks(callback, user.userid);


        $('#nameDisplayField').val(user.firstname + " " + user.lastname);
        $('#phoneDisplayField').val(user.phone);
        $('#emailDisplayField').val(user.email);
    },

    setProfileNotes : function () {
        let bookList = JSON.parse(localStorage.getItem('listOfBooks'));

        var callback = function(responseText){
            try {
                var notes = JSON.parse(responseText);

            } catch (e) {
                alert("Sorry, it seems something went wrong. Try Again.");
                // $("#loading").hide();
                return;
            }
            console.log(notes);

            var myNotes = $('#notesList').val();
            if(notes.message !== "No notes found for this book"){
                for(var note in notes){
                    myNotes += "   Book Notes for book: " + notes[note].bookid + "\n Note: " + notes[note].comment + " \n";
                }
            }

            $('#notesList').val(myNotes);
        };

        $('#notesList').val('Notes you have made on your books: \n');
        for(var book in bookList){
            endpointsNamespace.getBookNote(callback, bookList[book].bookid);
        }

    }
};
