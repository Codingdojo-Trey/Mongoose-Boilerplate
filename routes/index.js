module.exports = function Route(app){

	//this will require the mongoose module and allow us to connect to our MongoDB server!
	var mongoose = require('mongoose');

	//let's connect!  The last part of the string is the name of the MongoDB database
	var db = mongoose.connect('mongodb://localhost/new_db')

	//now let's make a mongoose schema that will give some structure to our MongoDB collections
	var gnarwalSchema = new mongoose.Schema({
		first_name: {type: String, required: true},
		last_name: {type: String, required: true},
		age: {type: Number, required: true}
		//to make the Schema connect with an existing DB table, uncomment the line below!
		}//, {collection: 'gnarwals'}
	);

	//make the actual model to interact with our DB
	var Gnarwal = mongoose.model('Gnarwal', gnarwalSchema);

	app.get('/', function(req, res){
		//CALLBACK OR DIE!
		Gnarwal.find({}, function(errors, all_gnarwals){
			console.log(all_gnarwals);
			//render has to go in the callback to have access to the queried data :)
			res.render('index', {title: 'ballin with Gnarwals', gnarwals: all_gnarwals})
		})
	})

	app.post('/gnarwals/new', function(req, res){
		var new_gnarwal = new Gnarwal(req.body);
		//MUST USE CALLBACK TO MAKE WORLD RIGHT AGAIN!
		new_gnarwal.save(function(errors){
			if(errors)
			{
				res.redirect('/');
			}
			else
			{
				res.redirect('/');
			}
		})
	})

	app.get('/gnarwals/destroy/:id', function(req, res){
		console.log('THIS GNARWAL NEEDS TO DIE PAINFULLY!', req.params.id);
		Gnarwal.remove({_id: req.params.id}, function(errors){
			console.log("THE PAIN!!!!!!! THIS GNARWAL HAS BLED!  FAREWELL AQUEOUS FRIEND!")
			res.redirect('/');
		})
	})

	app.get('/gnarwals/edit/:id', function(req, res){
		Gnarwal.findOne({_id: req.params.id}, function(errors, this_gnarwal){
			res.render('edit', {gnarwal: this_gnarwal});
		})
	})

	app.post('/gnarwals/:id', function(req, res){
		Gnarwal.update({_id: req.params.id}, req.body, function(errors, this_gnarwal){
			res.redirect('/');
		})
	})

	app.get('/angular', function(req, res){
		res.render('angular');
	})

	app.post('/http', function(req, res){
		//execute logics here
		console.log(req.body)
		var robin_williams = {favorite: 'Good Will Hunting', runner_up: "Mrs. Doubtfire", standup: "BEST EVER"}
		res.json(robin_williams);
	})
}//end enormous function