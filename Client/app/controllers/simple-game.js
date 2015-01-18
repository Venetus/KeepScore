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
		}
	},
	showingTable: false,
	showingMatches: true
});
