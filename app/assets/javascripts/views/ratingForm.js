App.Views.RatingForm = Backbone.View.extend({
  el:"#rating-form",
  events: {
    "click button#x-button" : "closeForm",
    "click #submit" : "submitRating"
  },
  attributes: {
    //this.attributes.query
    //this.attributes.title
    //this.attributes.url
    //this.attributes.description
  },
  initialize: function(){

  },
  closeForm: function(e) {
    e.preventDefault();
    this.$el.addClass('hidden');
  },
  submitRating: function(e) {
    console.log('here I am beggining');
    e.preventDefault();
    //create new resource based on this.attributes
    //save resource
    //grab rating info, create new rating from it
    //make this resources' ID the resource_id for the rating we create
    //save rating
  }
});
