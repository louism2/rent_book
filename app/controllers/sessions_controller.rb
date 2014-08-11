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
    redirect_to sign_in_path()
  end
  
end
