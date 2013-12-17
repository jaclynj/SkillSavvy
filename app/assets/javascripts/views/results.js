App.Views.Results = Backbone.View.extend({
  events: {
    "click a" : "showRatingForm"
  },
  attributes: {
    //this.attributes.query
  },
  showRatingForm: function(e){
    //if what was clicked was 'rate this'
    if (e.currentTarget.innerText == 'Rate This') {
      e.preventDefault();
      //displays and moves rating box
      var rating = $('#rating-form');
      var newTop = e.currentTarget.offsetTop - 80;
      var newLeft = e.currentTarget.offsetLeft + 100;
      rating.css({top:newTop, left: newLeft});
      //passes attributes of resource to rating form
      var item = $(e.currentTarget.attributes.href.ownerElement.parentElement.childNodes[0]);
      var bod = $(e.currentTarget.attributes.href.ownerElement.parentElement.childNodes[2]);
      var resourceBody = bod.text();
      var resourceLink = item.context.href;
      var resourceName = item.context.innerText;
      App.ratingForm = new App.Views.RatingForm({attributes:{query: this.attributes.query, title: resourceName, url: resourceLink, description: resourceBody} });
      App.ratingForm.on('resetEverything', this.reloadResults);
      rating.removeClass('hidden');
    }
  },
  reloadResults: function(){
    console.log('beginning of function');
    console.log(App.main.ratingInfo);
    var resourceId = this.resource.id;
    var resourceView = this.resource.view;
    App.main.ratings.fetch({
      success: function() {
        App.main.ratingInfo = App.main.ratings.where({resource_id: resourceId});
        //ratingInfo is a list of ratings for that resource
        console.log(App.main.ratingInfo);
        console.log(resourceView);
        var thisRatingDiv = $('#rating-' + resourceId);
        // i want to pass in the rating div that belongs to this resource
        App.main.displayRating(thisRatingDiv);
      }
    });
    // instead of creating a new rating div, clear and append to 'rating-97' or whatever
    console.log('after the function');
  }
});
