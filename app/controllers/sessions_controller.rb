class SessionsController < ApplicationController
  
  def new
    
  end
  
  def create
    @landlord = Landlord.authenticate(params[:email], params[:password])
    if @landlord
      sign_in @landlord
      flash[:success] = "Welcome Back!"
      redirect_to @landlord
    else
      flash.now[:error] = "Invalid Password or Email"
      render 'new'
    end
  end
  
  def destroy
    sign_out
    flash[:success] = "You successfully signed out!"
    redirect_to sign_in_path()
  end
  
end
