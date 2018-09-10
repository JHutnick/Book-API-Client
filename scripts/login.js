// 'use strict';

var loginNamespace = {
  showAndSetLoginButtonClickEvents : function() {
    $('.accountPage').fadeIn("slow");

    $('#logoutButton').click(function () {
      localStorage.clear();
      location.reload();
    });

    $('.notRegisteredMsg').click(function () {
        $('form').animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 'slow');
    });

    $('#loginButton').click(function () {
        event.preventDefault();

        var email = $('#nameEnter').val();
        var password = $('#userPasswordAttempt').val();

        $('.accountPage').hide();
        $("#loading").show();

        if (!(email && password)) {
          alert("Please enter all the fields!");
          $('.accountPage').show();
          $("#loading").hide();
          return;
        }

        // What to do when we get all users from server.
        var callback = function(responseText) {
          try {
            var listOfUsers = JSON.parse(responseText);
          } catch (e) {
            alert("Sorry, it seems something went wrong. Try Again.");
            $('.accountPage').show();
            $("#loading").hide();
            return;
          }

          var activeUser = undefined;
          for (var i = 0; i < listOfUsers.length; i++) {
            var user = listOfUsers[i];
            if (user.email === email && user.password === password) {
              activeUser = user;
              break;
            }
          }

          // If we couldnt find a user from the list of users.
          if (!activeUser) {
            alert("No such user! Check email or password.");
            $('.accountPage').show();
            $("#loading").hide();
            return;
          }

          localStorage.setItem(CURRENT_USER_INFO_KEY,
            JSON.stringify(activeUser));
          alert("Welcome! You logged in successfully!");
          location.reload();
        };

        endpointsNamespace.getAllUsers(callback);
    });

    $('#createAccountButton').click(function () {
        event.preventDefault();

        var email = $('#emailAddressField').val();
        var password = $('#passwordField').val();
        var firstName = $('#firstNameField').val();
        var lastName = $('#lastNameField').val();
        var phoneNumber = $('#phoneNumberField').val();

        if (!(email && password && firstName && lastName && phoneNumber)) {
          alert("Please enter all the fields!");
          return;
        }

        // When user clicks create account, hide log in stuff
        // so they cannot accidentally click create again.
        // Keep login stuff hidden until we get a response from the
        // server.
        $('.accountPage').hide();
        $("#loading").show();

        var loginPayload = {
          "firstname" : firstName,
          "lastname" : lastName,
          "email" : email,
          "phone" : phoneNumber,
          "isadmin" : true,
          "password" : password
        };

        // What to do when we get the server response.
        var callback = function(responseText) {
          console.log(responseText);
          console.log(responseText === undefined)
          if (!responseText) {
            alert("Sorry, it seems something went wrong. Try Again.");
            $('.accountPage').show();
            $("#loading").hide();
            return;
          }
          if (responseText.indexOf("userid") > -1) {
            alert("You have registered successfully. "
            + "Log in when page is refreshed.");
            // // TODO(sharice): Remove when server is up.
            // loginPayload["userid"] = 8;
            // localStorage.setItem(CURRENT_USER_INFO_KEY,
            //   JSON.stringify(loginPayload));
            //   // Look at TODO above.
            location.reload();
          } else if (responseText.indexOf("exists") > -1) {
            alert("This user already seems to exist!");
            $('.accountPage').show();
            $("#loading").hide();
          } else {
            alert("Sorry, it seems something went wrong. Try Again.");
            $('.accountPage').show();
            $("#loading").hide();
          }
        };

        // TODO: Uncomment when ready to test with live database.
        // For testing, see comment below.
        endpointsNamespace.createNewUser(callback, loginPayload);

        // For testing, since I dont want to create legit new users in the
        // database, im feeding the callback function a fake responseText.
        //callback("success");
    });
  }

  // Add a comma and add more functions here if needed.
};


// DO NOT ADD FUNCTIONS HERE. THIS IS THE GLOBAL SCOPE. PLEASE ADD
// FUNCTIONS TO ENDPOINTS OBJECT ABOVE OR CREATE A NEW NAMESPACE OBJECT.
