class Payment < ActiveRecord::Base
   
   validates :tenant_id,         :presence => true
   
   validates :receivable_id,     :presence => true
   
   validates :amount,            :presence => true
   
   validates :payment_date,      :presence => true
   

end
