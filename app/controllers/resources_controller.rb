class ResourcesController < ApplicationController

  def new
    @resource = Resource.new
  end

  def create
    @resource = Resource.new(params[:resource])
    if @resource.save
      render json: @resource
    else
      render json: {message: 'fail!'}, status:  :unauthorized
    end
  end

  def index
    @resources = Resource.all

    respond_to do |format|
      format.html { redirect_to root_path }# index.html.erb
      format.json { render json: @resources }
    end
  end


  # GET /users/1
  # GET /users/1.json
  def show
    @resource = Resource.find(params[:id])

    respond_to do |format|
      format.html  # show.html.erb
      format.json { render json: @resource }
    end
  end
end
