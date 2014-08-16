class Building < ActiveRecord::Base
  
  belongs_to :landlord
  has_many :units
  
  validates :name,              presence: true,
                                length: {maximum: 50}
  
  validates :street_address,    presence: true,
                                length: {maximum: 50}
                                
  validates :city,              presence: true,
                                length: {maximum: 50},
                                format: { with: /\A[A-Za-z\s]+\Z/ }
                                
  validates :zip_code,          presence: true,
                                length: {is: 5},
                                numericality: true
                                
  validates :state,             presence: true,
                                length: {is: 2},
                                format: { with: /\A[A-Z]{2,2}\Z/ }
                                
  validates :landlord_id,       presence: true                              
  
  
  def self.building_show_query(building_id)
    raw_sql = 'SELECT buildings.landlord_id, units.id AS unit_id, units.unit_number, units.balance, units.monthly_rent,
              tenants.id AS tenant_id, tenants.name 
              FROM buildings 
              LEFT OUTER JOIN units ON buildings.id = units.building_id 
              LEFT OUTER JOIN rental_obligations ON units.id = rental_obligations.unit_id
              LEFT OUTER JOIN tenants ON rental_obligations.tenant_id = tenants.id
              WHERE building_id = ? ORDER BY unit_number'
    sanitized_sql = sanitize_sql_array([raw_sql, building_id])
    ActiveRecord::Base.connection.execute(sanitized_sql)
  end
  
end
