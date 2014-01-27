App.Views.RatingForm = Backbone.View.extend({
  el:"#rating-form",
  events: {
    "click button#x-button" : "closeForm",
    "click #submit-button" : "submitForm",
  },
  attributes: {
    //this.attributes.query
    //this.attributes.title
    //this.attributes.url
    //this.attributes.description
  },

  initialize: function(){
    this.resource = new App.Models.Resource();
    App.main.resources.add(this.resource);
    this.rating = new App.Models.Rating();
    App.main.ratings.add(this.rating);
    this.listenTo(this.resource, 'savedResource', this.createRating);
    this.listenTo(App.main, 'turn it off', this.closeForm);
  },

  closeForm: function(e) {
    if (e) {
      e.preventDefault();
    }
    this.$el.fadeOut(200, function(){
      App.ratingForm.$el.addClass('hidden');
    });
  },
  submitForm: function(e) {
    if (e) {
      e.preventDefault();
    }
    App.ratingForm.closeForm();
    App.ratingForm.assignResource();
  },

  assignResource: function(e) {
    if (e) {
      e.preventDefault();
    };
    App.main.resources.fetch({
      success: function(){
        var thisMain = App.ratingForm;
        var existingResource = App.main.resources.findWhere({url: thisMain.attributes.url});
        if (existingResource && existingResource != [] && existingResource != null) {
          var existingRating = App.main.ratings.findWhere({user_id: App.main.userId, resource_id: existingResource.id });
          if (existingRating && existingRating != null && existingRating != []) {
          } else {
            thisMain.resource = existingResource;
            thisMain.createRating();
          }
        } else {
          App.ratingForm.createResource();
        }
      }
    });
  },

  createResource: function() {
    var thisMain = App.ratingForm;
    thisMain.resource.set({
      query: thisMain.attributes.query,
      title: thisMain.attributes.title,
      url: thisMain.attributes.url,
      description: thisMain.attributes.description
    });
      thisMain.resource.save(null, {
      success: function(model, response){
        thisMain.resource.trigger('savedResource');
      }
    });
  },

  createRating: function() {
    this.skillLevel = $('#skill-level option:selected').val();
    this.overallRating = $('#overall-rating option:selected').val();
    this.overallRating = parseInt(this.overallRating);
    this.rating.set({
      resource_id: App.ratingForm.resource.id,
      user_id: App.main.userId,
      overall_rating: this.overallRating
      });
    this.setSkillLevel();
  },

  setSkillLevel: function() {
    if (this.skillLevel === 'newbie') {
      this.rating.set({
        newbie_rating: this.overallRating
      });
    } else if (this.skillLevel === 'novice') {
      this.rating.set({
        novice_rating: this.overallRating
      });
    } else if (this.skillLevel === 'advanced') {
      this.rating.set({
        adv_rating: this.overallRating
      });
    } else {
      this.rating.set({
        expert_rating: this.overallRating
      });
    }
    this.rating.save(null, {
      success: function(model, response){
        App.ratingForm.trigger('resetEverything');
      },
      error: function(model, response) {
        // console.log(response);
      }
    });
  }
});
