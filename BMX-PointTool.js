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

    };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
