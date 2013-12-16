class RatingsController < ApplicationController

  def new
    @rating = Rating.new
  end

  def create
    @rating = Rating.new(params[:rating])
    if @rating.save
      render json: @rating
    else
      render json: {message: 'fail!'}, status:  :unauthorized
    end
  end
end
