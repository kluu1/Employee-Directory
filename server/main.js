import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

Meteor.startup(() => {
  // Check to see if data exists in the collection on startup
  const numberRecords = Employees.find({}).count();

  // If no data, generate some data with faker
  if (!numberRecords) {
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();

      Employees.insert({
        name,
        email,
        phone,
        avatar: image.avatar()
      });
    });
  }

  Meteor.publish('employees', function (per_page) {
    return Employees.find({}, { limit: per_page });
  });
});
