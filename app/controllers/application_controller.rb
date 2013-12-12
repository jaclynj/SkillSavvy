class ApplicationController < ActionController::Base
  protect_from_forgery

  private

  def current_user #if user is logged in
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end
  helper_method :current_user #turns this into a helper method so it can be used in views

end
