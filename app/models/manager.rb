class Manager < ActiveRecord::Base
  #require 'array_type_validator'
  
  validates :name,              :presence => true  
  
  validates :responsibilities,  :array_type => true
  
  validates :email,             :presence => true
  
  validates :phone_number,      :presence => true
  
end
