import { useState, useEffect } from 'react'
import './App.css'




function App() {
  const [fact, setFact] = useState('');
  const [fullName, setFullName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('black');
  const [showContent, setShowContent] = useState(true);

  const QUOTE_ENDPOINT = 'https://catfact.ninja/fact';
  const AUTHOR_ENDPOINT = 'https://randomuser.me/api/?inc=name';

  const getQuote = () => {
    fetch(QUOTE_ENDPOINT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data;
        setFact(data.fact);
      });
  };

  const getAuthor = async () => {
    fetch(AUTHOR_ENDPOINT)
      .then(response => response.json())
      .then(data => {
        const { first, last } = data.results[0].name;
        const fullName = `${first} ${last}`;
        setFullName(fullName);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  // Función para generar un color aleatorio hexadecimal
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const colorChange = () => {
    document.body.style.transition = 'background-color 3s ease'; // Duración y tipo de animación
    document.body.style.backgroundColor = backgroundColor;
  };

  const handleClick = () => {
    setShowContent(false); // Hacer desaparecer el contenido
    setBackgroundColor(getRandomColor());
    getAuthor();
    getQuote();
  };

  useEffect(() => {
    colorChange();
    setShowContent(true); // Hacer aparecer el contenido después de cargar los nuevos datos
  }, [backgroundColor]);


  const shareQuote = () => {
    const twitterUrl =`https://twitter.com/intent/tweet?text=${encodeURIComponent(
    "#CATFACT "  + fact + `\n\n -${fullName}` // Utiliza el valor de la cita almacenado en el estado 'fact'
  )}`;
  window.open(twitterUrl, '_blank');
  };

  return (
    <main>
      <div className="container">
        <h1>RANDOM CATFACT MACHINE😺</h1>
        <div id="quote-box">
          <div className={`quote-text ${showContent ? 'fade-in' : 'fade-out'}`}>
            <i className="fa fa-quote-left"></i>
            <span id="text">{fact} </span>
            <i className="fa fa-quote-right"></i>
          </div>
          <div className={`quote-author ${showContent ? 'fade-in' : 'fade-out'}`}>
            -{fullName}
            <span id="author"></span>
          </div>
          <div className="buttons">
            <a className="button" id="tweet-quote" title="Tweet this quote!" target="_top">
            <i class="fa-brands fa-twitter" onClick = {shareQuote}></i>
            </a>
            <button className="button" id="new-quote" onClick={handleClick}>
              New quote
            </button>
          </div>
        </div>
        <div className="footer">by <a>AxelDo</a></div>
      </div>
    </main>
  );
}

export default App;