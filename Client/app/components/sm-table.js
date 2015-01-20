import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'div',
	classNames: 'table-responsive',
	// External Parameters
	matches : undefined,

	// New object class
	Player : Ember.Object.extend({
		name: null,
		played: 0,
		wins: 0,
		loses: 0,
		draws: 0,
		scoreMade: 0,
		scoreConceded: 0,

		isEditing: false,

		scoreDifference: function(){ 
			return this.get('scoreMade') - this.get('scoreConceded') ;
		}.property('scoreMade', 'scoreConceded'),

		points: function(){
			return this.get('wins') * 3 + this.get('draws');
		}.property('wins', 'draws'),

		// functions
		addMatch: function(scoreMade, scoreConceded){
				scoreConceded 	= parseInt(scoreConceded) || 0;
				scoreMade 		= parseInt(scoreMade) || 0;
			this.set('played', this.get('played') + 1);
			this.set('scoreMade', this.get('scoreMade') + scoreMade);
			this.set('scoreConceded', this.get('scoreConceded') + scoreConceded);

			if(scoreMade > scoreConceded){
				this.set('wins', this.get('wins') + 1);
			}
			else if(scoreConceded > scoreMade){
				this.set('loses', this.get('loses') + 1);
			}
			else{
				this.set('draws', this.get('draws') + 1);			
			}
		}
	}),

	// Private 

	players: Ember.computed.alias('sortedPlayers'),

	allPlayers: function(){
		var matches = this.get('matches'),
			players = Ember.A(),
			_this 	= this;
		
		matches.forEach(function(match){
			var player1Name = match.get('player1Name'),
				player2Name = match.get('player2Name'),
				player1Score = match.get('player1Score'),
				player2Score = match.get('player2Score');

			if(_this.isValidMatch(match)){

				var isEditing = match.get('isNew') || false;

				var player1 = _this.Player.create({ 'name': player1Name , 'isEditing' : isEditing });
				var player2 = _this.Player.create({ 'name': player2Name , 'isEditing' : isEditing });

				player1.addMatch(player1Score, player2Score);
				player2.addMatch(player2Score, player1Score);

				players.pushObject(player1);	
				players.pushObject(player2);

			}
		});

		return players;
	}.property('matches.@each.player1Name', 'matches.@each.player1Score', 'matches.@each.player2Name', 'matches.@each.player2Score', 'matches.@each.isNew'),

	// Unique players
	mergedPlayers: function(){
		var allPlayers = this.get('allPlayers'),
			mergedPlayers = Ember.A();

		allPlayers.forEach(function(player){
			var mergedPlayer = mergedPlayers.findBy('name', player.name); 
			
			if(mergedPlayer===undefined) {
				mergedPlayer = mergedPlayers.pushObject(player);
			}else {
				mergedPlayer.addMatch(player.get('scoreMade'), player.get('scoreConceded')) ;
				if(player.get('isEditing')){
					mergedPlayer.set('isEditing', true);
				}
			}
			
		});
		return mergedPlayers;
	}.property('allPlayers'),

	sortedPlayers: function(){
		var sortedMergedPlayers = this.get('mergedPlayers').sortBy('points', 'scoreDifference');

		//Hack to show the array in descending order
		var descSortedPlayers = Ember.A();
		sortedMergedPlayers.forEach(function(player){
			descSortedPlayers.insertAt(0, player);
		});

		return descSortedPlayers;

	}.property('mergedPlayers'),

	isValidMatch: function(match){
		var player1Name = match.get('player1Name'),
			player2Name = match.get('player2Name');

		if(player1Name!==undefined && player1Name!=="" && player2Name!==undefined && player2Name!==""){
			return true;
		}

		return false;
	}



});
