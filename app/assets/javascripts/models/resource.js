App.Models.Resource = Backbone.Model.extend({
  urlRoot: '/resources',
  defaults: {
    added_by:  2,
    description:  "",
    price:     "",
    query:  "",
    title: "",
    url:    ""
  },
  initialize: function(){
  }
});
