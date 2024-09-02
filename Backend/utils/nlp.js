// const natural = require('natural');
// const Museum = require('../models/Museum');

// const tokenizer = new natural.WordTokenizer();
// const classifier = new natural.BayesClassifier();

// // Train the classifier
// classifier.addDocument('Hello', 'greeting');
// classifier.addDocument('Hi', 'greeting');
// classifier.addDocument('Book a ticket', 'booking');
// classifier.addDocument('Reserve a ticket', 'booking');
// classifier.addDocument('Museum information', 'info');
// classifier.addDocument('Tell me about the museum', 'info');
// classifier.addDocument('Opening hours', 'hours');
// classifier.addDocument('When is the museum open', 'hours');
// classifier.addDocument('Ticket prices', 'pricing');
// classifier.addDocument('How much do tickets cost', 'pricing');
// classifier.train();

// const processMessage = async (message) => {
//   const tokens = tokenizer.tokenize(message.toLowerCase());
//   const intent = classifier.classify(message);

//   switch (intent) {
//     case 'greeting':
//       return "Hello! How can I assist you with your museum visit today?";
//     case 'booking':
//       return "Certainly! I can help you book a ticket. Please provide the museum name, date, and number of tickets you'd like to purchase.";
//     case 'info':
//       if (tokens.includes('museum')) {
//         const museumName = tokens.slice(tokens.indexOf('museum') + 1).join(' ');
//         const museums = await Museum.search(museumName);
//         if (museums.length > 0) {
//           return `Here's some information about ${museums[0].name}: ${museums[0].description}`;
//         }
//       }
//       return "I'd be happy to provide information about our museums. Which museum are you interested in?";
//     case 'hours':
//       return "Most of our museums are open Tuesday through Sunday, from 10:00 AM to 6:00 PM. However, hours may vary for specific museums. Which museum are you interested in?";
//     case 'pricing':
//       return "Ticket prices vary depending on the museum. Adult tickets typically range from $12 to $25. Which museum are you interested in?";
//     default:
//       return "I'm sorry, I didn't quite understand that. Could you please rephrase your question or ask about booking tickets, museum information, pricing, or opening hours?";
//   }
// };

// module.exports = { processMessage };


const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const classifier = new natural.BayesClassifier();

// Train the classifier with more Indian museum-specific intents
classifier.addDocument('Tell me about', 'info');
classifier.addDocument('What is', 'info');
classifier.addDocument('Where is', 'location');
classifier.addDocument('How to reach', 'location');
classifier.addDocument('Opening hours', 'hours');
classifier.addDocument('When is it open', 'hours');
classifier.addDocument('Ticket price', 'pricing');
classifier.addDocument('How much does it cost', 'pricing');
classifier.addDocument('Book tickets', 'booking');
classifier.addDocument('I want to visit', 'booking');
classifier.addDocument('Reserve tickets', 'booking');
classifier.train();

const processMessage = async (message, museums) => {
  const tokens = tokenizer.tokenize(message.toLowerCase());
  const intent = classifier.classify(message);

  switch (intent) {
    case 'info':
    case 'location':
    case 'hours':
    case 'pricing':
      return handleMuseumQuery(intent, tokens, museums);
    case 'booking':
      return "Certainly! I can help you book tickets. Please provide the following information:\n1. The name of the museum you want to visit\n2. Your name\n3. Your email\n4. The date of your visit\n5. The number of tickets you need\nOr, if you prefer, I can show you a booking form to fill out.";
    default:
      return "I'm sorry, I didn't quite understand that. Could you please ask about a specific museum, ticket information, or about booking tickets?";
  }
};

const handleMuseumQuery = (intent, tokens, museums) => {
  const museumName = findMuseumName(tokens, museums);
  if (!museumName) {
    return "I'm sorry, I couldn't find a museum matching that name. Could you please specify which Indian museum you're interested in?";
  }

  const museum = museums.find(m => m.name.toLowerCase() === museumName.toLowerCase());
  
  switch (intent) {
    case 'info':
      return `${museum.name} is ${museum.description}`;
    case 'location':
      return `${museum.name} is located in ${museum.location}. ${museum.directions || ''}`;
    case 'hours':
      return `The opening hours for ${museum.name} are ${museum.opening_hours}.`;
    case 'pricing':
      return `The ticket price for ${museum.name} is ₹${museum.ticket_price}.`;
  }
};

const findMuseumName = (tokens, museums) => {
  const museumNames = museums.map(m => m.name.toLowerCase().split(' ')).flat();
  const foundTokens = tokens.filter(token => museumNames.includes(token));
  if (foundTokens.length > 0) {
    const index = tokens.indexOf(foundTokens[0]);
    return tokens.slice(index).join(' ');
  }
  return null;
};

module.exports = { processMessage };