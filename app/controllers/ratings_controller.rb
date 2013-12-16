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

  def index
    @ratings = Rating.all

    respond_to do |format|
      format.html { redirect_to root_path }# index.html.erb
      format.json { render json: @ratings }
    end
  end


  # GET /users/1
  # GET /users/1.json
  def show
    @rating = Rating.find(params[:id])

    respond_to do |format|
      format.html  # show.html.erb
      format.json { render json: @rating }
    end
  end
end
