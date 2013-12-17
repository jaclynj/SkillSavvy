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
  // attrs is model attributes
  // options are what's passed from save or set
  initialize: function(){
    // this.view = new App.Views.RatingView({model: this});
  }
});
