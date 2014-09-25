class TenantsController < ApplicationController
  
  def create
    tenant = Tenant.create(tenant_parameters)
    if tenant.persisted?
      sign_in tenant
      render json: {tenant: {id: tenant.id}}
    else
      response.status = "400"
      render json: {errors: tenant.errors}
    end
  end
  
private

  def tenant_parameters
    params.require(:tenant).permit(:name, :date_of_birth, :email, :email_confirmation, :password, :password_confirmation)
  end
  
end
