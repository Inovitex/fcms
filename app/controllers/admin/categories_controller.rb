class Admin::CategoriesController < ApplicationController

  def show
    @category = Category.find(params[:id])
    condition = ["? BETWEEN max AND min", current_user.birthday]
    respond_to do |format|
      format.json { render :json => {:category =>  @category, :max_duration =>  @category.agegroups.where(condition).first}}
    end
  end

end

