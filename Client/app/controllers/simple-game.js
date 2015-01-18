import Ember from 'ember';

export default Ember.ArrayController.extend({
	actions: {
		showTable : function(){
			this.set('showingTable', true);
			this.set('showingMatches', false);
		},
		showMatches : function(){
			this.set('showingMatches', true);
			this.set('showingTable', false);
		},

		deleteGame: function(match) {
			match.destroyRecord();
		}
	},
	showingTable: true,
	showingMatches: false,

	//For future proofing ember-cli 2.0
	attrs: {}
});
