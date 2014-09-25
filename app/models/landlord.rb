class Landlord < ActiveRecord::Base
  
  extend SessionsHelper
  include SessionsHelper
  
  has_many :buildings
  
  before_create :encrypt_password
  before_update :encrypt_password, unless: "password.blank?"
  
  #email_regex = /\A[\w\-.]+@[a-z\d\-.]+\.[a-z]+\Z/i
  password_regex = /\A(?=.*\d)(?=.*[a-zA-Z]).{8,}\Z/i
 
  attr_accessor :password, :password_confirmation, :email_confirmation
  
  validates :name,                      presence: true
  
  validates :email,                     presence: true,
                                        confirmation: true
  
  validates :password,                  allow_blank: true,
                                        format: {:with => password_regex},
                                        confirmation: true      
  
  def sign_in_query
    { buildings: self.buildings }
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
