class LandlordsController < ApplicationController
  
  def auth
    
    # dev_cleint_id: ca_4G71KSnxGfaUqrR7Y0gXgyCoktnasmhp
    
    #code = params[:code]
    code = "ac_4G7o02ADrpH1vgjQmz3Nc6jUHR5gXcgL"
    postData = Net::HTTP.post_form(URI.parse('https://connect.stripe.com/oauth/token'), {'code'=> code, 'client_secret' => 'sk_test_tTndnwq76QzfilIrXTok7yhK'})
    
    
    # response from auth flow:  http://localhost:3000/stripe/account_authorization?scope=read_write
    # &code=ac_4G7o02ADrpH1vgjQmz3Nc6jUHR5gXcgL
    
    # {
    #   "access_token": "sk_test_wjFpOS56RZxp1giKApGYSFnB",
    #   "livemode": false,
    #   "refresh_token": "rt_4G98GSgjcVqUqF13QJ4oHsr0xBpo447c5wXLhdcX76MhRCPL",
    #   "token_type": "bearer",
    #   "stripe_publishable_key": "pk_test_x5j9z7KLv59LUycN52OS9MDY",
    #   "stripe_user_id": "acct_1AGl5ZbcBpkM6oOuJldY",
    #   "scope": "read_write"
    # }
  end
  
  def new
    render nothing: true
    
  end
  
  def create
    landlord = Landlord.create(landlord_attributes)
    if landlord.persisted?
      sign_in landlord
      render json: {landlord: {id: landlord.id}}
    else
      response.status = "400"
      render json: {errors: landlord.errors}
    end
  end
  
  def show
    landlord = Landlord.includes(:buildings).find(current_user.id)
    render json: {landlord: landlord, buildings: landlord.buildings}
  end
  
  def edit
    landlord = Landlord.find(current_user)
    render json: {landlord: landlord}
  end
  
  def update
    landlord = Landlord.find(current_user)

  end
  
private

  def landlord_attributes
    params.require(:landlord).permit(:name, :email, :password, :password_confirmation)
  end
  
end
