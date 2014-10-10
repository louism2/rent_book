module SessionsHelper
  
  def sign_in(user)
    cookies.permanent.signed['remember_token_'+user.class.to_s.downcase!] = [user.id, user.salt] 
    self.current_user=(user) 
  end
  
  def encrypt_password  
    salt = make_salt 
    encrypted_password = encrypt(password)
  end
  
  def sign_out(user)
  	cookies.delete('remember_token_'+user.class.to_s.downcase!)
  	self.current_user = nil 
  end
  
  def current_user=(user)  
    @current_user = user
  end
  
  def current_user 
    @current_user
  end
  
  def authenticate_with_salt(id, user_salt_from_cookie)   
    return nil unless id
    user = find(id)
    (user && user.salt == user_salt_from_cookie) ? user : nil   
  end

  def authenticate(email, submitted_password) 
    user = self.where(email: email).first
    return nil if user.nil?
    user.has_password?(submitted_password) ? user : false
  end
  
  # def signed_in?
  #   !current_user.nil?
  # end
  
  # def sign_out_link
  #   link_to 'sign out', sign_out_path, {method: :delete}
  # end
  
  def has_password?(submitted_password) 
    encrypted_password == encrypt(submitted_password) 
  end
  
private

  def encrypt(pass)
    secure_hash("#{salt} -- #{pass}") 
  end
  #     
  #       def make_salt
  #         secure_hash("#{Time.now.utc} -- #{password}")
  #       end
  #     
  #       def secure_hash(string)
  #         Digest::SHA2.hexdigest(string)
  #       end
  #     

  # def remember_token
  #     cookies.signed[:remember_token] || [nil, nil]
  # end

  
  # No longer calling a abstracted method to auth both tenant's and landlord's.  Auth is handled in a before_action in 
  # ApplicationController and individual, user-level auth is handled in each controller.  
  
  # def user_from_remember_token
  #   authenticate_with_salt(*remember_token) 
  # end
  
  
end