module ApplicationHelper
  
  ## used to assign the current_user instance variable that will then be 
  ## looked at using the grant_access method that will be ran as a filter in 
  ## each individual controller
  
  def authenticate_request
    user = find_user
    raise UnauthorizedUser unless user
    set_current_user(user)  
  end  
  
private  

  def safe_page?
    params[:controller] == 'pages' or (params[:controller] == 'sessions' && params[:action] == 'create')
  end
  
  def find_user      
    if !cookies.signed[:remember_token_landlord].blank?
      Landlord.authenticate_with_salt(*cookies.signed[:remember_token_landlord] || [nil,nil])
    else
      Tenant.authenticate_with_salt(*cookies.signed[:remember_token_tenant] || [nil,nil])      
    end  
  end
  
  def set_current_user(user)  
    @current_user = user
  end
  
  def deny_access
    render json: {status: 'failure', message: 'unauthenticated user' }
  end
  
end
