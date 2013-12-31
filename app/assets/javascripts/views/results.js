App.Views.Results = Backbone.View.extend({
  events: {
    "click a.rate-this" : "showRatingForm"
  },
  attributes: {
    //this.attributes.query
  },
  showRatingForm: function(e){
      e.preventDefault();
      //displays and moves rating box
      var rating = $('#rating-form');
      //passes attributes of resource to rating form
      var item = $(e.currentTarget.attributes.href.ownerElement.parentElement.childNodes[2]);
      var bod = $(e.currentTarget.attributes.href.ownerElement.parentElement.childNodes[6]);
      var resourceBody = bod.text();
      var resourceLink = item.context.href;
      var resourceName = item.context.textContent;
      //this is important! Prevents rating form from submitting multiple times
      if (App.ratingForm) {
        App.ratingForm.stopListening();
        App.ratingForm.undelegateEvents();
      };
      //that was important
      App.ratingForm = new App.Views.RatingForm({attributes:{query: this.attributes.query, title: resourceName, url: resourceLink, description: resourceBody} });
      App.ratingForm.on('resetEverything', this.reloadResults);
      rating.removeClass('hidden');
      rating.fadeIn(320);
  },
  reloadResults: function(){
    console.log('before reloading');
    $('#successful-rating').fadeOut(100);
    App.main.updateResources();
    console.log('after reloading');
    App.main.results.ratedSuccess();
  },
  ratedSuccess: function() {
    var successMessage = $('#successful-rating');
    successMessage.fadeIn(600);
  }
});
