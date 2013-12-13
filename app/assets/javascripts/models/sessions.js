App.UserSession = Backbone.Model.extend({
  urlRoot: "/session",
  id:    "#{current_user.id}",
  token: "#{current_user.token}"
});
