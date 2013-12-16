App.Collections.Resources = Backbone.Collection.extend({
  url: '/resources',
  initialize: function(){
    this.fetch();
  }
});
