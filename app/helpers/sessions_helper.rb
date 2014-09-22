module SessionsHelper
  
  def sign_in(user)
    cookies.permanent.signed[:remember_token] = [user.id, user.salt] 
    self.current_user=(user) 
  end
  
  def signed_in?
    !current_user.nil?
  end
  
  def sign_out  
  	cookies.delete(:remember_token)
  	self.current_user = nil 
  end
  
  def current_user=(user)  
    @current_user = user
  end
  
  def current_user 
    @current_user ||= user_from_remember_token  
  end
  
  def sign_out_link
    link_to 'sign out', sign_out_path, {method: :delete}
  end
  
  
  # called from the Tenant and Landlord classes.  This module is 
  # loaded into each class so these methods are available as class methods
  def authenticate_with_salt(id, user_salt_from_cookie)   
    user = find_by_id(id)
    (user && user.salt == user_salt_from_cookie) ? user : nil   
  end

  def authenticate(email, submitted_password) 
    logger.debug(">>>>>>>>>> inside")
    user = self.where(email: email).first
    logger.debug(">>>>>>>>> user : #{user.inspect}")
    return nil if user.nil?
    user.has_password?(submitted_password) ? user : false
  end

  def has_password?(submitted_password) 
    encrypted_password == encrypt(submitted_password) 
  end
  
  def encrypt_password  
    self.salt = make_salt 
    self.encrypted_password = encrypt(password)
  end
  
  def encrypt(pass)
    secure_hash("#{salt} -- #{pass}") 
  end

  def make_salt
    secure_hash("#{Time.now.utc} -- #{password}")
  end

  def secure_hash(string)
    Digest::SHA2.hexdigest(string)
  end
  

private

  def remember_token
      cookies.signed[:remember_token] || [nil, nil]
  end

  def user_from_remember_token
    Landlord.authenticate_with_salt(*remember_token) 
  end
  
  
end