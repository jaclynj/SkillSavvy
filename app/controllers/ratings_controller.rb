class RatingsController < ApplicationController

  def new
    @rating = Rating.new
  end

  def create
    @rating = Rating.new(params[:rating])
    if @rating.save
      redirect_to root_url, :notice => "Rated"
    else
      render "new"
    end
  end
end
