backbone_data.Views.SignInView = Backbone.View.extend({
	template: JST["sessions/sign_in"],
	events: {
		'submit #sign_in_form':'signInUser',
		'click #create_account_link':'createNewLandlord',
		'click .toggle_sign_in_form':'toggleForm'
	},
	render: function(){
		this.$el.html(this.template());
		return this		
	},
	signInUser: function(e){
		e.preventDefault();
		var $form = $('#sign_in_form');
		var email = $('#email').val();
		var pass = $('#password').val();
		this.sendSignInRequest(email, pass);
		return false;
	},
	sendSignInRequest: function(email, password){
		$.ajax('/sessions',{
				type: 'POST',
				data: {email: email, password: password}
		}).done(function(data){
			console.log(data);
		}).fail(function(jqXHR, textStatus, errorThrown){
			
		});
	},
	createNewLandlord: function(){
		var landlord = ns.landlord;
		var newLandlordView = new backbone_data.Views.NewLandlordView({model: landlord});
		$container.html(newLandlordView.render().el);
	},
	toggleForm: function(e){
		e.preventDefault();
		var link = $(e.currentTarget);
		var $view = this.$el;
		if(link.data('id') == 'landlord'){
			// switch link text to tenant
			// switch hidden field id value to landlord
			link.text('Sign in as Tenant');
			link.data('id','tenant');
			$view.find('#sign_in_form > input[type="hidden"]').val('Landlord');
		}else{
			// switch link text back to landlord
			// switch hidden field id value to tenant
			$view.find('.toggle_sign_in_form').text('Sign in as Landlord');
			$view.find('.toggle_sign_in_form').data('id','landlord');
			$view.find('#sign_in_form > input[type="hidden"]').val('Tenant');			
		}
		
	}
});	