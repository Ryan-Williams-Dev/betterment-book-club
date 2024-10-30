const quotes = [
  {
    quote: "Reading is to the mind what exercise is to the body.",
    author: "Joseph Addison",
  },
  {
    quote:
      "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    author: "George R.R. Martin",
  },
  {
    quote:
      "Reading is essential for those who seek to rise above the ordinary.",
    author: "Jim Rohn",
  },
  { quote: "Books are the training weights of the mind.", author: "Epictetus" },
  {
    quote:
      "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss",
  },
  {
    quote:
      "Reading furnishes the mind only with materials of knowledge; it is thinking that makes what we read ours.",
    author: "John Locke",
  },
  {
    quote: "A book is a dream that you hold in your hand.",
    author: "Neil Gaiman",
  },
  {
    quote: "Once you learn to read, you will be forever free.",
    author: "Frederick Douglass",
  },
  {
    quote:
      "The best advice I ever got was that knowledge is power and to keep reading.",
    author: "David Bailey",
  },
  {
    quote: "Reading is a basic tool in the living of a good life.",
    author: "Mortimer J. Adler",
  },
  { quote: "Today a reader, tomorrow a leader.", author: "Margaret Fuller" },
  {
    quote: "A book is a gift you can open again and again.",
    author: "Garrison Keillor",
  },
  {
    quote:
      "Reading is the gateway skill that makes all other learning possible.",
    author: "Barack Obama",
  },
  {
    quote:
      "The only thing you absolutely have to know is the location of the library.",
    author: "Albert Einstein",
  },
  {
    quote:
      "You can never get a cup of tea large enough or a book long enough to suit me.",
    author: "C.S. Lewis",
  },
  { quote: "Books are a uniquely portable magic.", author: "Stephen King" },
  {
    quote:
      "There is more treasure in books than in all the pirate's loot on Treasure Island.",
    author: "Walt Disney",
  },
  {
    quote:
      "Books are mirrors: you only see in them what you already have inside you.",
    author: "Carlos Ruiz Zafón",
  },
  {
    quote:
      "I do believe something very magical can happen when you read a good book.",
    author: "J.K. Rowling",
  },
  {
    quote: "Reading is a discount ticket to everywhere.",
    author: "Mary Schmich",
  },
  {
    quote:
      "The man who does not read good books is no better than the man who can't.",
    author: "Mark Twain",
  },
  {
    quote: "Think before you speak. Read before you think.",
    author: "Fran Lebowitz",
  },
  {
    quote:
      "No matter how busy you may think you are, you must find time for reading, or surrender yourself to self-chosen ignorance.",
    author: "Confucius",
  },
  {
    quote:
      "Books serve to show a man that those original thoughts of his aren't very new after all.",
    author: "Abraham Lincoln",
  },
  {
    quote:
      "Reading is an exercise in empathy; an exercise in walking in someone else’s shoes for a while.",
    author: "Malorie Blackman",
  },
  {
    quote: "A room without books is like a body without a soul.",
    author: "Cicero",
  },
  {
    quote: "If you don’t like to read, you haven’t found the right book.",
    author: "J.K. Rowling",
  },
  {
    quote:
      "Fill your house with stacks of books, in all the crannies and all the nooks.",
    author: "Dr. Seuss",
  },
  {
    quote:
      "Reading gives us someplace to go when we have to stay where we are.",
    author: "Mason Cooley",
  },
  {
    quote: "I have always imagined that Paradise will be a kind of library.",
    author: "Jorge Luis Borges",
  },
  {
    quote:
      "Reading is a form of prayer, a guided meditation that briefly makes us believe we're someone else, bringing us the enlightenment to understand that we are more, and less, than what we think.",
    author: "George Saunders",
  },
  {
    quote:
      "You know you've read a good book when you turn the last page and feel a little as if you have lost a friend.",
    author: "Paul Sweeney",
  },
  {
    quote:
      "Books are the plane, and the train, and the road. They are the destination, and the journey. They are home.",
    author: "Anna Quindlen",
  },
  { quote: "A book worth reading is worth buying.", author: "John Ruskin" },
  {
    quote:
      "It is what you read when you don't have to that determines what you will be when you can't help it.",
    author: "Oscar Wilde",
  },
  {
    quote: "Books are lighthouses erected in the great sea of time.",
    author: "E.P. Whipple",
  },
  { quote: "A good book is an event in my life.", author: "Stendhal" },
  {
    quote:
      "The reading of all good books is like a conversation with the finest minds of past centuries.",
    author: "René Descartes",
  },
  {
    quote:
      "Books are the treasured wealth of the world and the fit inheritance of generations and nations.",
    author: "Henry David Thoreau",
  },
  {
    quote:
      "In books, I have traveled, not only to other worlds, but into my own.",
    author: "Anna Quindlen",
  },
];
const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
export const shuffledQuotes = shuffleArray(quotes);
