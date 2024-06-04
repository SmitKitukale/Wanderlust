// const mongoose = require("mongoose");
// const reviews = require("./reviews");
// const Schema = mongoose.Schema;
// const Review = require("./reviews.js");

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     url: {
//       type: String,
//     },
//   },
//   price: Number,
//   location: String,
//   country: String,
//   reviews: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Review",
//     },
//   ],
// });

// listingSchema.pre("save", function (next) {
//   if (!this.image.url || !this.image.url || this.image.url.trim() === "") {
//     this.image.url = "https://images5.alphacoders.com/130/1308151.jpeg";
//   }
//   next();
// });

// const Listing = mongoose.model("Listing",listingSchema);
//  module.exports = Listing;














const mongoose = require("mongoose");
const reviews = require("./reviews");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");
const { string, required } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image:{
    url:String,
    filename: String,
  } ,
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry:{
    type:{
      type:String ,
      enum:['Point'],
      required:true,
    },
    coordinates:{
      type:[Number],
      required:true,
    }
  },
  // category:{
  //   type:String,
  //   enum:[]
  // }
});

listingSchema.post("findOneAndDelete",async(listings) => {
  if(listings){
  await Review.deleteMany({_id : {$in : listingSchema.reviews}})
  }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;


// {
//   url : String,
//   filename :{
//     type: String,
//   defaults:
//     "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//   set: (v) =>
//     v === ""
//       ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
//       : v,
//   },
// },
