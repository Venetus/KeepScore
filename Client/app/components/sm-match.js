import Ember from 'ember';

export default Ember.Component.extend({	
	// Attributes passed externally
	match: undefined, // THe actual Match
	onDelete: undefined, // Action to be sent on delete 

	// Private Attributes
	showDeleteMatchButton: function(){
		return !this.get('isNew');
	}.property('isNew'),

	isEditing: Ember.computed.alias('isNew'),

	isNew: function(){
		return this.get('match').get('isNew') || false ; 
	}.property('match.isNew'),


	canBeShown: function(){
		var match = this.get('match'),
			player1Name = match.get('player1Name') || "",
			player2Name = match.get('player2Name') || "";

			return (player1Name !== "" || player2Name !== "") ;
	}.property('match.player1Name', 'match.player2Name'),

	// Actions
	actions : {
		delete: function() {
			this.sendAction('onDelete', this.get('match')) ;
		}
	},

	// CSS-Class Bindings
	rowClasses: function(){
		var defaultRowClasses = "row";
		if(this.get('isEditing')){
			defaultRowClasses+= " is-editing";
		}

		if(!this.get('canBeShown')){
			defaultRowClasses+= " hidden";
		}
			


		return defaultRowClasses;
	}.property('isEditing', 'canBeShown'),

	player1Wins: function(){
		var player1Score = this.get('match').get('player1Score') || 0,
			player2Score = this.get('match').get('player2Score') || 0;

		return player1Score > player2Score ;

	}.property('match.player1Score', 'match.player2Score'),


	player2Wins: function(){
		var player1Score = this.get('match').get('player1Score') || 0,
			player2Score = this.get('match').get('player2Score') || 0;

		return player1Score < player2Score ;

	}.property('match.player1Score', 'match.player2Score')

});
