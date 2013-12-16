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
      var item = $(e.currentTarget.attributes.href.ownerElement.parentElement.childNodes[1]);
      var bod = $(e.currentTarget.attributes.href.ownerElement.parentElement.childNodes[3]);
      var resourceBody = bod.text();
      var resourceLink = item.context.href;
      var resourceName = item.context.innerText;
      App.ratingForm = new App.Views.RatingForm({attributes:{query: this.attributes.query, title: resourceName, url: resourceLink, description: resourceBody} });
      rating.removeClass('hidden');
    }
  }
});
