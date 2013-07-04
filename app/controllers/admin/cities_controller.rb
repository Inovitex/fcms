#encoding: utf-8
class Admin::CitiesController < ApplicationController

  def new
    @city = City.new
    @cities = City.all
  end

  def create
    begin
      @city = City.new(params[:city])
      if @city.save
        render :json => @city
      else
        render :json => {:message => @city.errors.full_messages}, :status => :unprocessable_entity
      end
    rescue
      render :json => {:message => @city.errors.full_messages}, :status => :unprocessable_entity
    end
  end

  def destroy
    begin
      @city = City.find(params[:id])
      if @city
        @city.destroy
        render :json => {:message => "La ville a été supprimée avec succès"}, :status => :ok
      else
        render :json => {:message => "La ville n'a pas été trouvée"}, :status => :unprocessable_entity
      end
    rescue
      render :json => {:message => "Erreur lors de la suppression de la ville"}, :status => :unprocessable_entity
    end
  end

  def update
    begin
      @city = City.find(params[:id])
      if @city
        if @city.update_attributes(params[:city])
          render :json => @city
        else
          render :json =>{:message => "La ville n'a pu être mise à jour"}, :status => :unprocessable_entity
        end
      else
        render :json => {:message =>  "La ville n'a pas été trouvée"}, :status => :unprocessable_entity
      end
    rescue
      render :json => {:message => "Erreur lors de la mise à jour de la ville"}, :status => :unprocessable_entity
    end
  end

  def show
    @city = City.find(params[:id])
    render :json => @city
  end

end