class Tenant < ActiveRecord::Base
  
  extend SessionsHelper
  include SessionsHelper
  
  before_create :encrypt_password
  before_update :encrypt_password, unless: "password.blank?"
  
  attr_accessor :password, :password_confirmation, :email_confirmation
  
  validates :name,              presence: true
  
  
  def sign_in_query
    response = {}
    units = units_query
    unit_info = unit_info_query  
    units.each do |unit|
      response[unit['unit_id']] = {unit_number: unit['unit_number'], receivables: nil}
    end  
    unit_info.group_by{ |rec| rec['unit_id'] }.each_pair{|key,val| response[key][:receivables] = val} 
    { data: response }
  end  
  

private

  def units_query
    query = "SELECT rental_obligations.unit_id, units.unit_number, buildings.name
    FROM rental_obligations
    LEFT OUTER JOIN units ON rental_obligations.unit_id = units.id
    LEFT OUTER JOIN buildings ON units.building_id = buildings.id
    WHERE rental_obligations.tenant_id = #{self.id}"
    ActiveRecord::Base.connection.execute(query)
  end

  def unit_info_query
    query = "SELECT receivables.unit_id AS unit_id, receivables.id, receivables.balance, payments.amount, 
    payments.tenant_id, payments.created_at
    FROM receivables
    LEFT OUTER JOIN payments ON receivables.unit_id = payments.receivable_id
    WHERE receivables.unit_id IN (SELECT unit_id FROM rental_obligations WHERE tenant_id = #{self.id}) 
    ORDER BY payments.created_at DESC"
    ActiveRecord::Base.connection.execute(query)
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

end