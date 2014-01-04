    App.Router = Backbone.Router.extend({
      routes: {
        ""  : "index"
      },
      initialize: function(){
        Backbone.history.start();
        App.main = new App.Views.Main();
        // new App.UserSession();
      },
      index: function(){
        // console.log('index');
      }
    });
