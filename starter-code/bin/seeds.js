const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");

const dbName = "celebrities-lab";
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebrities = [
  {
    name: "Adam Levine",
    occupation: "singer",
    catchPhrase: "Men need to live and breathe women."
  },
  {
    name: "Kim Kardashian",
    occupation: "unknown",
    catchPhrase:
      "I love when people underestimate me and then become pleasantly surprised."
  },
  {
    name: "Brad Pitt",
    occupation: "actor",
    catchPhrase:
      "Being married means I can break wind and eat ice cream in bed."
  },
  {
    name: "Ewan mcgregor",
    occupation: "actor",
    catchPhrase:
      "Our diversity is our strength. What a dull and pointless life it would be if everyone was the same."
  }
];

Celebrity.create(celebrities, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${celebrities.length} celebrities`);
  mongoose.connection.close();
});
