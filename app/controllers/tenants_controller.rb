class TenantsController < ApplicationController
  
  before_filter :grant_access?, only: [:show, :update, :destroy]
  
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
  
  def show
    tenant = current_user
    tenant_data = tenant.namespace_data_query
    render json: { status: 'success', tenant: tenant, data: tenant_data }  
  end
  
private

  def grant_access?
    if params[:id]
      return true if params[:id] == current_user.id
      raise UnauthorizedUser
    else
      current_user.access_tenant? if current_user.class == 'Landlord'
    end     
  end

  def tenant_parameters
    params.require(:tenant).permit(:name, :date_of_birth, :email, :email_confirmation, :password, :password_confirmation)
  end
  
end
