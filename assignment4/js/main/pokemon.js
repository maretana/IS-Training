'use strict';

var POKEMON_TYPE_NAME = {
	FIRE : 'fire',
	GRASS : 'grass',
	WATER : 'water',
	ELECTRIC : 'electric'
};

var EFFECTIVENESS = {
	SUPER_EFFECTIVE : 2,
	NEUTRAL : 1,
	NOT_VERY_EFFECTIVE : 0.5
};

var BASE_DAMAGE_FACTOR = 50;

var PokemonType = function (name) {
	this.weaknesses = [];
	this.strengths = [];
	this.name = name;

	this.weaknesses.push(this);
};

PokemonType.prototype = {
	addWeakness : function(pokemonType) {
		if (this.weaknesses.indexOf(pokemonType) === -1) {
			this.weaknesses.push(pokemonType);
			pokemonType.addStrength(this);
		}
	},

	addStrength : function(pokemonType) {
		if (this.strengths.indexOf(pokemonType) === -1) {
			this.strengths.push(pokemonType);
			pokemonType.addWeakness(this);
		}
	},

	getEffectivenessFactor : function(pokemonType) {
		if (this.weaknesses.indexOf(pokemonType) !== -1) {
			return EFFECTIVENESS.NOT_VERY_EFFECTIVE;
		}
		else if (this.strengths.indexOf(pokemonType !== -1)) {
			return EFFECTIVENESS.SUPER_EFFECTIVE;
		}
		else {
			return EFFECTIVENESS.NEUTRAL;
		}

	}
};

var POKEMON_TYPES =
{
	fireType :  new PokemonType(POKEMON_TYPE_NAME.FIRE),
	waterType :  new PokemonType(POKEMON_TYPE_NAME.WATER),
	grassType :  new PokemonType(POKEMON_TYPE_NAME.GRASS),
	electricType :  new PokemonType(POKEMON_TYPE_NAME.ELECTRIC)
};

POKEMON_TYPES.fireType.addStrength(POKEMON_TYPES.grassType);
POKEMON_TYPES.fireType.addWeakness(POKEMON_TYPES.waterType);
POKEMON_TYPES.waterType.addWeakness(POKEMON_TYPES.grassType);
POKEMON_TYPES.waterType.addWeakness(POKEMON_TYPES.electricType);

var charizard =
{
	'name' : 'Charizard',
	'type' : POKEMON_TYPES.fireType.name,
	'attack' : 65,
	'defense' : 35
};

var blastoise =
{
	'name' : 'Blastoise',
	'type' : POKEMON_TYPES.waterType.name,
	'attack' : 40,
	'defense' : 60
};

var venusaur =
{
	'name' : 'Venusaur',
	'type' : POKEMON_TYPES.grassType.name,
	'attack' : 50,
	'defense' : 50
};

var pikachu =
{
	'name' : 'Pikachu',
	'type' : POKEMON_TYPES.electricType.name,
	'attack' : 70,
	'defense' : 30
};

var getPokemonTypeFromName = function(pokemonTypeName) {
	for (var pokemonType in POKEMON_TYPES) {
		if (POKEMON_TYPES.hasOwnProperty(pokemonType)) {
			var type = POKEMON_TYPES[pokemonType];
			if (type.name === pokemonTypeName) {
				return type;
			}
		}
	}
	return null;
};

var calculateEffectivenessFactor = function(attacker, defender) {
	var attackerType = getPokemonTypeFromName(attacker.type);
	var defenderType = getPokemonTypeFromName(defender.type);
	return attackerType.getEffectivenessFactor(defenderType);
};

var damage = function(attacker, defender) {
	var effectiveness = calculateEffectivenessFactor(attacker, defender);
	return Math.round(BASE_DAMAGE_FACTOR * (attacker.attack / defender.defense) * effectiveness);
};
