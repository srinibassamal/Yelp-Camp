var express    = require("express");
var app 	   = express();
var bodyParser = require("body-parser");
const	mongoose   = require("mongoose")

mongoose.connect("mongodb://localhost:27017/yelp_camp",{
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log("Connected to DB!"))
	.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

//Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});
var Campground = mongoose.model("Campground",campgroundSchema);

Campground.create(
{
	name: "Salmon Creek",
	image: "https://www.tibettravelexpert.com/wp-content/uploads/2017/10/Kailash-Saga-Dawa-Tour.jpg"
}, 
function(err, campground){
	if (err) {
		console.log(err);
	} else {
		console.log("Newly create campgrounds: ");
		console.log(campground);
	}
});

//var campgrounds = [
//		{name: "Srinibas Samal",image:"https://media-exp1.licdn.com/dms/image/C5603AQEwnIaXyKwFQg/profile-displayphoto-shrink_200_200/0?e=1598486400&v=beta&t=McjLq5jqmShLnTLdoWMAjujwPCZDs2cZtD-cpYuNIEw"},
//		{name: "Grantie Hill",image:"https://media-cdn.tripadvisor.com/media/photo-s/10/e4/a2/f3/granite-hills.jpg"},
//		{name: "Mountain Goats Rest",image:"https://live.staticflickr.com/3543/3297277787_67de0b1db9_b.jpg"},
//		{name:"Holy Mount",image:"https://i.pinimg.com/originals/3d/10/a3/3d10a3193e223d8df3735e9aaeb3742e.jpg"},
//		{name:"Travel guide",image:"https://i.ytimg.com/vi/VwAG-y0sTjc/maxresdefault.jpg"}
//
//];


app.get("/",function(req, res){
	res.render("landing");
});
//Index show all campgrounds
app.get("/campgrounds",function(req, res){
	Campground.find({}, function(err,allCampgrounds){
		if (err) {
			console.log(err);
		} else {
			res.render("index",{campgrounds:allCampgrounds});
		}
	});
	
});
//create  add new campground to db
app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name,image: image}
	//create a new campground and save to db
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else{
			res.redirect("/campgrounds");
		}
	})

	//campgrounds.push(newCampground);
	
});
//new show form to create new camoground
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.get("/campgrounds/:id",function(req, res){
//find the campground with provided id
Campground.findById(req.params.id,function(err, foundCampground){
	if(err){
		console.log(err);
	} else {
		res.render("show",{campground: foundCampground});		
	}
});	

app.listen(5000, function(){
	console.log("The YelpCamp Server has Started!");
});

//var campgrounds= [
//	{name:"Tibet",image:"https://sacredland.org/wp-content/uploads/2017/06/snow-mt-kailash.jpg"},
//	{name:"Holy Mount",image:"https://i.pinimg.com/originals/3d/10/a3/3d10a3193e223d8df3735e9aaeb3742e.jpg"},
//	{name:"Travel guide",image:"https://i.ytimg.com/vi/VwAG-y0sTjc/maxresdefault.jpg"},
//	{name:"Spiritual",image:"https://www.tibettravelexpert.com/wp-content/uploads/2017/10/Kailash-Saga-Dawa-Tour.jpg"},
//	{name:"North Face",image:"https://live.staticflickr.com/1811/42266930690_95bb454dae_b.jpg"},
//	{name:"The Golden sun set",image:"https://www.tibettravel.org/blog/wp-content/uploads/2013/09/Ben-Mt-Kailash-Day-2-Sunrise-1.jpg"},
//	{name:"Mount kailash",image:"https://static.toiimg.com/img/71972246/Master.jpg"},
//	{name:"kailash",image:"https://static.toiimg.com/img/71972246/Master.jpg"}
