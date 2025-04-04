const quotes = [
    {
        quote: "Computer science empowers students to create the world of tomorrow.",
        speaker: "Satya Nadella"
    },
    {
        quote: "Most of the good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.",
        speaker: "Linus Torvalds, creator of Linux"
    },
    {
        quote: "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
        speaker: "Edsger Dijkstra, Dutch Computer Scientist" 
    }
]

const quote = document.querySelector("#quote span:first-child");
const speaker = document.querySelector("#quote span:last-child");

const curQuote = quotes[Math.floor(Math.random()*quotes.length)];
quote.innerText = curQuote.quote;
speaker.innerText = curQuote.speaker;

