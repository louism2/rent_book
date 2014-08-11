class ApplicationController < ActionController::Base
  
  protect_from_forgery with: :exception
  
  include SessionsHelper
  
  before_filter :log_headers
  
  def log_headers
    logger.debug(">>>>>>>>>>>>>>>> #{request.headers}")
  end
  
end
