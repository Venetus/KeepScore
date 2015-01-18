import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'div',
	classNames: 'table-responsive',
	// External Parameters
	matches : undefined,

	// Private
	allUniquePlayers: function(){
		var matches = this.get('matches'),
			players = Em.A();
		
		matches.forEach(function(match){
			var player1Name = match.get('player1Name'),
				player2Name = match.get('player2Name');

			if(player1Name!==undefined && player1Name!="")
				players.pushObject(player1Name);

			if(player2Name!==undefined && player2Name!="")
				players.pushObject(player2Name);
		});

		return players.uniq();

	}.property('matches')	
});
