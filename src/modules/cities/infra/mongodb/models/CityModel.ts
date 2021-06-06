import mongoose, { Schema } from 'mongoose';

const citySchema = new Schema({
  name: String,
  state: String
});

const CityModel = mongoose.model('City', citySchema);

export default CityModel;