class ApplicationController < ActionController::Base
  
  include ApplicationHelper, SessionsHelper
  
  protect_from_forgery with: :exception
  
  
  before_action :authenticate_request, unless: :safe_page?
  
  rescue_from UnauthorizedUser, with: :deny_access
  
end




