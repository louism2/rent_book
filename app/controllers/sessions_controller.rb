class SessionsController < ApplicationController
  
  def new
    
  end
  
  def create
    constant = params[:identity].constantize
    @user = constant.authenticate(params[:email], params[:password])
    if @user
      sign_in @user
      response = {status: 'success'}
      response[params[:identity].downcase] = @user
      render json: response
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
