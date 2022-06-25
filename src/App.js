import React, {useState , useEffect} from 'react';
import './App.scss';
import COLORS_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons';
import {faQuoteRight} from '@fortawesome/free-solid-svg-icons';



let quotesURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";



function App() {
  const [quote, setQuote] = useState("Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless."); 
  const [author,setAuthor] = useState("Jamie Paolinetti");
  const [randomNumber,setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  
  const [accentColor,setAccentColor]=useState('#F4BFBF')
  
  const fetchQuotes = async (url) => {
    const response = await fetch (url);
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }
  useEffect(() => {
    fetchQuotes(quotesURL)
  }, [quotesURL])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random())
    setRandomNumber (randomInteger)
    setAccentColor(COLORS_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  }

  return (
    <div className="App">
      <header className="App-header" 
      style={{backgroundColor: accentColor}}>
        <div id="quote-box" style={{color:accentColor}}>
        <h2 id="text">
          <span id="quote-icon">
            <FontAwesomeIcon icon={faQuoteLeft}/>
          </span>
          {quote}
          <span id ="quote-icon">
            <FontAwesomeIcon icon={faQuoteRight}/>
          </span>
        </h2>
        <p id="author" >
          - {author}
        </p>
        <div className="buttons">
        <a id="tweet-quote" style={{backgroundColor: accentColor}}
        href={encodeURI(`https://www.twitter.com/intent/tweet?text=${quote}-${author}`)}>
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        </div>
        <button id="new-quote" style={{backgroundColor: accentColor}} onClick={ () => getRandomQuote()}>
          New Quote
        </button>
        </div>
      </header>
    </div>
  );
}

export default App;
