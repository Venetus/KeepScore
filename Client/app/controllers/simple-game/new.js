import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		addGame: function(){
			var model = this.get('model');
			var player1Name = model.get('player1Name');
			var player2Name = model.get('player2Name');

			//model.save();	

			alert('Your game has been saved') ; //@Todo gör snyggare dialog
			this.set('model', this.store.createRecord('simpleGame', { 'player1Name' : player1Name, 'player2Name': player2Name }));
		}
	}
});
