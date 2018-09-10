// 'use strict';

var navNamespace = {

  showNavigationBar : function() {
    $('.navigationLink').fadeIn("slow");
    $(".homePage").fadeIn("slow");
  },

  setClickListeners : function() {
    //    current page variable
    var $current = `.homePage`;

    //    complete navigation system for the SPA here

    $('.navigationLink').click(function (event) {
        $($current).fadeOut('fast');
        if (event.target.id === "logoutButton") {
          localStorage.clear();
          location.reload();
          return;
        }
        // Concatenates the clicked targets id with the word "Page"
        // to create another id which matches up with an html element
        // and then fades in that element.

        if(event.target.id === "bookHomeLanding") {return;}
        $(`.${event.target.id}Page`).fadeIn('slow');
        $current = `.${event.target.id}Page`;
    })

    console.log($current);

    $('.slideButton').click(function () {

        $('.slideWindow').toggle('slide', {
            direction: 'right'
        });

        console.log('clicked slide button');

    });
  }

};

// DO NOT ADD FUNCTIONS HERE. THIS IS THE GLOBAL SCOPE. PLEASE ADD
// FUNCTIONS TO ENDPOINTS OBJECT ABOVE OR CREATE A NEW NAMESPACE OBJECT.
