backbone_data.Views.SignInView = Backbone.View.extend({
	template: JST["sessions/sign_in"],
	events: {
		'submit #sign_in_form':'signInUser',
		'click #create_account_link':'createNewUser',
		'click #toggle_sign_in_form':'toggleForm'
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
		var identity = $('#identity').val();
		this.sendSignInRequest(email, pass, identity);
		return false;
	},
	sendSignInRequest: function(email, password, identity){
		var self = this;
		$.ajax('/sessions',{
				type: 'POST',
				data: {email: email, password: password, identity: identity}
		}).done(function(data){
			if(data.status == 'success'){
				self.showUser(data);
				console.log(data);
			}else{
				// present login error
			}
		}).fail(function(jqXHR, textStatus, errorThrown){
			// present error
		});
	},
	showUser: function(data){
		var headerNavigationView = new backbone_data.Views.HeaderNavigationView({attributes: {signed_in: true}});
		if(data.landlord){
			headerNavigationView.attributes.type = 'landlord'
			backbone_data.Helpers.setAndShowLandlord(data);
		}else if(data.tenant){
			headerNavigationView.attributes.type = 'tenant'
			backbone_data.Helpers.setAndShowTenant(data);
		}
		$header.find('a').remove();
		$header.append(headerNavigationView.render().$el);
		backbone_data.Helpers.setAndShowLandlord(data);
	},
	createNewUser: function(e){
		if($(e.currentTarget).data('type') == 'tenant'){
			var tenant = new backbone_data.Models.Tenant();
			var newTenantView = new backbone_data.Views.NewTenantView({model: tenant});
			$container.html(newTenantView.render().el);			
		}else{	
			var landlord = new backbone_data.Models.Landlord();
			var newLandlordView = new backbone_data.Views.NewLandlordView({model: landlord});
			$container.html(newLandlordView.render().el);	
		}
		return false;

	},
	toggleForm: function(e){
		e.preventDefault();
		var $link = $(e.currentTarget);
		var $create_link = $('#create_account_link');
		var $view = this.$el;
		if($link.data('id') == 'landlord'){
			$link.data({id: 'tenant'});
			$link.text('Sign in as Tenant');
			
			$create_link.text('Create a new Landlord account');
			$create_link.data('type', 'landlord');
			$view.find('#sign_in_form > input[type="hidden"]').val('Landlord');
		}else{
			
			$link.text('Sign in as Landlord'); //
			$link.data('id','landlord'); //

			$create_link.text('Create a new Tenant account');
			$create_link.data('type','tenant');
			$view.find('#sign_in_form > input[type="hidden"]').val('Tenant');			
		}
	}
});	