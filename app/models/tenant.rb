class Tenant < ActiveRecord::Base
  
  extend SessionsHelper
  include SessionsHelper
  
  before_create :encrypt_password
  before_update :encrypt_password, unless: "password.blank?"
  
  attr_accessor :password, :password_confirmation, :email_confirmation
  
  validates :name,              presence: true
  
  
  def namespace_data_query
    response = {}
    unit_info_query.each do |payment|
      response[payment['unit_id']] = {building: {id: payment['building_id'], name: payment['building_name'], unit_number: payment['unit_number']}, receivables: {}} if response[payment['unit_id']].nil?
      add_receivable_entry(response, payment)
      add_payments_entry(response, payment)
    end
    response
  end
 
private

  def unit_info_query
    query = "SELECT receivables.unit_id, receivables.id AS receivable_id, receivables.balance, receivables.created_at,
    payments.id AS payment_id, payments.amount, payments.tenant_id, payments.created_at AS date,
    buildings.name AS building_name, buildings.id AS building_id,
    units.unit_number, units.monthly_rent
    FROM receivables
    LEFT OUTER JOIN payments ON receivables.unit_id = payments.receivable_id
    LEFT OUTER JOIN units ON receivables.unit_id = units.id
    LEFT OUTER JOIN buildings ON units.building_id = buildings.id
    WHERE receivables.unit_id IN (SELECT unit_id FROM rental_obligations WHERE tenant_id = #{self.id}) 
    ORDER BY payments.created_at DESC"
    ActiveRecord::Base.connection.execute(query)
  end

  def add_receivable_entry(hsh, payment)
    hsh[payment['unit_id']][:receivables][payment['receivable_id']] = {rec: {balance: payment['balance'], rent: payment['monthly_rent'], date: payment['created_at']}, payments: []} if hsh[payment['unit_id']][:receivables][payment['receivable_id']].nil?
  end  
  
  def add_payments_entry(hsh, payment)
    hsh[payment['unit_id']][:receivables][payment['receivable_id']][:payments] << {id: payment['payment_id'], amount: payment['amount'], tenant_id: payment['tenant_id'], date: payment['date']} unless payment['payment_id'].nil?
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