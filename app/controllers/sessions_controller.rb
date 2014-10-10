class SessionsController < ApplicationController
  
  def new
    
  end
  
  def create
    constant = params[:identity].constantize
    user = constant.authenticate(params[:email], params[:password])
    if user
      sign_in user
      client_data = user.namespace_data_query
      response = { status: 'success', params[:identity].downcase => user, data: client_data }
      render json: response
    else
      render json: {status: 'failure'}
    end
  end
  
  def destroy
    sign_out(current_user)
    flash[:success] = "You successfully signed out!"
    # JS in the template is redirecting to sign in page within the backbone app
    redirect_to '/homepage'
  end
  
end
