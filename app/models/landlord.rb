class Landlord < ActiveRecord::Base
  
  has_many :buildings
  
  before_create :encrypt_password
  before_update :encrypt_password, unless: "password.blank?"
  
  #email_regex = /\A[\w\-.]+@[a-z\d\-.]+\.[a-z]+\Z/i
  password_regex = /\A(?=.*\d)(?=.*[a-zA-Z]).{8,}\Z/i
 
  attr_accessor :password, :password_confirmation
  
  validates :name,                      presence: true
  
  validates :email,                     presence: true,
                                        confirmation: true
  
  validates :password,                  allow_blank: true,
                                        format: {:with => password_regex},
                                        confirmation: true      
  
  
  def self.authenticate_with_salt(id, user_salt_from_cookie) 
    user = find_by_id(id)
    (user && user.salt == user_salt_from_cookie) ? user : nil   
  end

  def self.authenticate(email, submitted_password) 
    user = Landlord.where(email: email).first
    return nil if user.nil?
    user.has_password?(submitted_password) ? user : false
  end

  def has_password?(submitted_password) 
    encrypted_password == encrypt(submitted_password) 
  end

private 

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
 
end
