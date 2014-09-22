class Tenant < ActiveRecord::Base
  
  extend SessionsHelper
  include SessionsHelper
  
  before_create :encrypt_password
  before_update :encrypt_password, unless: "password.blank?"
  
  attr_accessor :password, :password_confirmation
  
  validates :name,              presence: true
  
  
end
