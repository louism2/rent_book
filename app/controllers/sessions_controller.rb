class SessionsController < ApplicationController
  
  def new
    
  end
  
  def create
    @landlord = Landlord.authenticate(params[:email], params[:password])
    if @landlord
      sign_in @landlord
      render json: {status: 'success', landlord: @landlord}
    else
      render json: {status: 'failure'}
    end
  end
  
  def destroy
    sign_out
    flash[:success] = "You successfully signed out!"
    # JS in the template is redirecting to sign in page within the backbone app
    redirect_to '/homepage'
  end
  
end
