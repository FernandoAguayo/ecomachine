import {Meteor} from 'meteor/meteor';

import {State} from './collection';

Meteor.publish('state.status', function() {
    return State.find({});
});