RSpec::Rails::ControllerExampleGroup.class_eval  do
  
  def set_user_cookies(request_object, cookie_name, user)
    jar = ActionDispatch::Cookies::CookieJar.build(request_object)
    jar.signed[cookie_name.intern] = [user.id, user.salt]
    request_object.cookies[cookie_name] = jar[cookie_name.intern]
  end
  
end