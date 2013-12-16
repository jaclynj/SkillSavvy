App.Collections.Ratings = Backbone.Collection.extend({
  url: '/ratings',
  initialize: function(){
    this.fetch();
  }
});
