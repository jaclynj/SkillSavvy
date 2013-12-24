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
    console.log('closing form');
    this.$el.fadeOut(200, function(){
      App.ratingForm.$el.addClass('hidden');
      App.ratingForm.undelegateEvents();

    });
  },
  submitForm: function(e) {
    console.log('submit button clicked');
    if (e) {
      e.preventDefault();
    }
    App.ratingForm.undelegateEvents();
    App.ratingForm.closeForm();
    App.ratingForm.assignResource();
  },

  assignResource: function(e) {
    console.log('im in the assign resource function');
    //creates or finds resource if it exists
    if (e) {
      e.preventDefault();
    };
    // this.closeForm();
    console.log('submitting form...');
    App.main.resources.fetch({
      success: function(){
        var thisMain = App.ratingForm;
        var existingResource = App.main.resources.findWhere({url: thisMain.attributes.url});
        if (existingResource && existingResource != [] && existingResource != null) {
          console.log('finding resource in db');
          thisMain.resource = existingResource;
          thisMain.createRating();
        } else {
          App.ratingForm.createResource();
        }
      }
    });
  },

  createResource: function() {
    console.log('creating resource');
    thisMain = App.ratingForm;
    thisMain.userId = $('form #user-id').val();
    thisMain.userId = parseInt(thisMain.userId);
    thisMain.resource.set({
      query: thisMain.attributes.query,
      title: thisMain.attributes.title,
      url: thisMain.attributes.url,
      description: thisMain.attributes.description
    });
      thisMain.resource.save(null, {
      success: function(model, response){
        console.log('saved resource');
        console.log(model);
        thisMain.resource.trigger('savedResource');
      }
    });
  },

  createRating: function() {
    //TODO this should happen only if this users has not rated this resource
    console.log('creating rating');
    this.skillLevel = $('#skill-level option:selected').val();
    this.overallRating = $('#overall-rating option:selected').val();
    this.overallRating = parseInt(this.overallRating);
    this.rating.set({
      resource_id: App.ratingForm.resource.id,
      user_id: App.ratingForm.userId,
      overall_rating: this.overallRating
      });
    this.setSkillLevel();
  },

  setSkillLevel: function() {
    if (this.skillLevel == 'newbie') {
      this.rating.set({
        newbie_rating: this.overallRating
      });
    } else if (this.skillLevel == 'novice') {
      this.rating.set({
        novice_rating: this.overallRating
      });
    } else if (this.skillLevel == 'advanced') {
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
        console.log('saved rating, resetting everything');
        App.ratingForm.trigger('resetEverything');
      },
      error: function(model, response) {
        console.log(response);
      }
    });
  }
});
