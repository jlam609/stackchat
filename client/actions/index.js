const store = require('./store');
const { gotMessagesFromServer } = require('./store')

console.log('-------------------------');
console.log('State before any actions: ', store.getState());

const gotMessagesAction = gotMessagesFromServer([{ author: 'Cody', content: 'Hello world!' }, { author: 'World', content: 'Oh, hey, Cody!' }]);
store.dispatch(gotMessagesAction);

console.log('-------------------------');
console.log('State after first GOT_MESSAGES_FROM_SERVER action: ', store.getState());

const anotherMessagesAction = gotMessagesFromServer([{ author: 'Ben', content: 'I like JS. How about you, Fira?' }, { author: 'Fira', content: 'I like Python!' }]);
store.dispatch(anotherMessagesAction);

console.log('-------------------------');
console.log('State after second GOT_MESSAGES_FROM_SERVER action: ', store.getState());