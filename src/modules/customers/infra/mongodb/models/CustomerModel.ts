import Customer from '@modules/customers/entities/Customer';
import mongoose, { Schema } from 'mongoose';

const customerSchema = new Schema({
  name: String,
  gender: String,
  birthDate: Date,
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City'
  }
},
  {
    toJSON: { virtuals: true }
  });

customerSchema.virtual('age').get(function (this: any) {
  return Customer.getAge(new Date(this.birthDate));
});

const CustomerModel = mongoose.model('Customer', customerSchema);

export default CustomerModel;