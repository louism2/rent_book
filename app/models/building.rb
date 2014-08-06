class Building < ActiveRecord::Base
  
  belongs_to :landlord
  has_many :units
  
  validates :name,       :presence => true
  
  validates :street_address,    :presence => true
  
end
