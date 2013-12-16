App.Models.Rating = Backbone.Model.extend({
  urlRoot: '/ratings',
  defaults: {
    newbie_rating:  0,
    novice_rating:  0,
    adv_rating:     0,
    expert_rating:  0,
    overall_rating: 0,
    resource_id:    1,
    user_id:        1
  },
  // attrs is model attributes
  // options are what's passed from save or set
  initialize: function(){

  }
});
