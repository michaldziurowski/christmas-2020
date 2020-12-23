import React, { useState } from 'react';
import './App.css';

function CookStep({ chooseCook }) {
  return (
    <div>
      <div className="title textcenter">Wybierz kucharza</div>
      <div className="container row center">
        <div className="container column">
          <img src="mdcook.jpg" alt="mdcook" />
          <button onClick={() => chooseCook('m')}>Michałek</button>
        </div>
        <div className="container column">
          <img src="grcook.jpg" alt="mdcook" />
          <button onClick={() => chooseCook('g')}>Ten drugi</button>
        </div>
      </div>
    </div>
  );
}

function Pick({ title, button, close }) {
  return (
    <div>
      <div className="title">{title}</div>
      <div>
        <button onClick={() => close()}>{button}</button>
      </div>
    </div>
  );
}

function MenuStep({ chooseMenu }) {
  const [before, setBefore] = useState('');
  const [main, setMain] = useState('');
  const [dessert, setDessert] = useState('');
  const [showPickMenu, setShowPickMenu] = useState(false);
  const [showPickMore, setShowPickMore] = useState(false);

  return (
    <>
      {!showPickMenu && !showPickMore && (
        <div>
          <div className="title">Wybierz dania z</div>
          <div className="container column">
            <div className="container column">
              <img src="book.jpg" alt="mdcook" />
            </div>
            <div className="container column">
              <input
                placeholder="Przystawka"
                value={before}
                onChange={(e) => setBefore(e.target.value)}
              ></input>
              <input
                placeholder="Danie główne"
                value={main}
                onChange={(e) => setMain(e.target.value)}
              ></input>
              <input
                placeholder="Deser"
                value={dessert}
                onChange={(e) => setDessert(e.target.value)}
              ></input>
              <button
                onClick={() => {
                  if (before === '' && main === '' && dessert === '') {
                    setShowPickMenu(true);
                  } else if (before === '' || main === '' || dessert === '') {
                    setShowPickMore(true);
                  } else {
                    chooseMenu({ before, main, dessert });
                  }
                }}
              >
                Mniam
              </button>
            </div>
          </div>
        </div>
      )}
      {showPickMenu && (
        <Pick
          title="Książka się nie podoba?"
          button="Nie no coś wybiorę"
          close={() => setShowPickMenu(false)}
        />
      )}
      {showPickMore && (
        <Pick
          title="To nie walentynki, można zamówić więcej dań z karty!"
          button="OK"
          close={() => setShowPickMore(false)}
        />
      )}
    </>
  );
}

function SummaryStep({ again, cook, menu }) {
  return (
    <>
      {cook === 'm' && (
        <div className="center column">
          <div className="title textcenter">
            Prudnicka fine dining restaurant zaprasza na
          </div>
          <div>
            <ol>
              <li>{menu.before}</li>
              <li>{menu.main}</li>
              <li>{menu.dessert}</li>
            </ol>
          </div>
          <div className="textcenter">
            Dania w dowolnym terminie przygotuje szef Michałek
          </div>
        </div>
      )}
      {cook === 'g' && (
        <div>
          <div className="center column">
            <img src="grangry.jpeg" alt="grangry"></img>
          </div>
          <div className="title">Michalka miałaś wybrać!</div>
          <div>
            <button onClick={() => again()}>Przepraszam poprawię się</button>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  const [step, setStep] = useState('cook');
  const [cook, setCook] = useState('');
  const [menu, setMenu] = useState({});
  return (
    <>
      <div className="app">
        {step === 'cook' && (
          <CookStep
            chooseCook={(c) => {
              setCook(c);
              setStep('menu');
            }}
          />
        )}
        {step === 'menu' && (
          <MenuStep
            chooseMenu={(m) => {
              setMenu(m);
              setStep('summary');
            }}
          />
        )}
        {step === 'summary' && (
          <SummaryStep again={() => setStep('cook')} cook={cook} menu={menu} />
        )}
      </div>
    </>
  );
}

export default App;
