if (Meteor.isClient) {
    Template.hello.greeting = function () {
    return "Welcome to BMX-PointTool.";
    };

    Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
    });

    Template.canvas.rendered = function()
    {
        setupEasel();

        // update global bool when checkbox changes
        $('#connectPoints:checkbox').change(
            function(e){

                if ($(this).attr("checked")) {
                    connectPoints = true;
                }
                else
                {
                    connectPoints = false;
                }
            }
        );

        // all elements in this form autosave after page refresh
        // https://github.com/jas-/jQuery.handleStorage/
        $('#imageStuff').handleStorage();

        // setting tight interval here because point array list doesn't get insta-saved when new lines added to canvas
        // this is because pointList textarea doesn't get a blur event
        $('#pointArrayForm').handleStorage({interval:3000});


    };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
