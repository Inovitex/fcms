#encoding: utf-8

##
# Invite users controller when creating a registration
class Users::InvitationsController < Devise::InvitationsController
  ##
  # Form to write user to invite
  def new
    @user = User.new
    @user.contactinfo ||= Contactinfo.new
    @user.contactinfo.city ||= City.new

    @roles = Role.all
  end

  ##
  # Send the email to invite the user
  def create
    begin
      @user = User.new(params[:user])
      @user.update_attribute(:password, SecureRandom.hex(8))

      respond_to do |format|
        if @user.save
          format.html {
            redirect_to new_user_invitation_path, :notice => 'L\'invitation a bien été envoyée!'
          }
          format.json {
            render :json => { :message => 'L\'invitation a bien été envoyée!' }, :status => :ok
          }
        else
          format.html {
            redirect_to new_user_invitation_path, :alert => 'Erreur lors de l\'invitation'
          }
          format.json {
            render :json => { :message => @user.errors.full_messages }, :status => :unprocessable_entity
          }
        end
      end

    end
  end
end