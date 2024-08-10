import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import itemsData from '../public/items.json';

function App() {
  const [name, setName] = useState('');
  const [nameIsSet, setNameIsSet] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [lastItemIndex, setLastItemIndex] = useState(0);
  const [lastVisitDate, setLastVisitDate] = useState('');
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);

  const cookieName = 'masterpieces';

  useEffect(() => {
    const cookie = getCookie();
    if (cookie) {
      setName(cookie.name);
      setNameIsSet(true);
      setLastItemIndex(cookie.lastItemIndex);
      setLastVisitDate(cookie.lastVisitDate);
      setWelcomeModalOpen(true);
    } else {
      setWelcomeModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (name && lastItemIndex >= 0) {
      const currentItem = getItem(lastItemIndex);
      setItemName(currentItem.name);
      setItemDescription(currentItem.description);
    }
  }, [name, lastItemIndex]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleWelcomeModalClose = () => {
    setWelcomeModalOpen(false);
  };

  const getCookie = () => {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find((c) => c.trim().startsWith(cookieName));
    if (cookie) {
      console.log(`Cookie is ${cookie.trim()}`);
      return JSON.parse(cookie.trim().substring(cookieName.length + 1));
    } else {
      return null;
    }
  };

  const setCookie = (cookie) => {
    document.cookie = `${cookieName}=${JSON.stringify(cookie)}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  };

  const handleNameSubmit = () => {
    setCookie({ name, lastItemIndex: 0, lastVisitDate: new Date() });
    setNameIsSet(true);
  };

  const getItem = (index) => {
    return itemsData[index];
  };

  const drawIntro = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">Enter your name to start:</h2>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Your Name"
          className="bg-gray-200 p-2 pl-4 pr-4 rounded"
        />
        <button
          onClick={handleNameSubmit}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Start!
        </button>
      </div>
    );
  };

  const drawItem = () => {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-2">{itemName}</h1>
        <p className="text-lg mb-4">{itemDescription}</p>
        <p className="text-sm">Day {lastItemIndex + 1}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => console.log('clicked done')}>I'm done!</button>
      </div>
    );
  };

  const drawWelcome = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          {nameIsSet ? (
            <>
              <h2 className="text-2xl font-bold mb-2">Welcome back {name}!</h2>
              <p className="text-lg mb-4">Hopefully you had a great day {lastItemIndex + 1}. Click the button below to start a new day!</p>
              <button
                onClick={handleWelcomeModalClose}
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Start a New Day
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2">Welcome to 100 Days of Masterpieces!</h2>
              <button
                onClick={handleWelcomeModalClose}
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Let's Start!
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-20">
      {welcomeModalOpen && drawWelcome()}
      {!welcomeModalOpen && (
        <div>{nameIsSet ? drawItem() : drawIntro()}</div>
      )}
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Render to the #root element
);