import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import itemsData from '../public/items.json';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [nameIsSet, setNameIsSet] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [lastItemIndex, setLastItemIndex] = useState(0); // all jacked up
  const [prevItemIndex, setPrevItemIndex] = useState(-1); // all jacked up
  const [currItemIndex, setCurrItemIndex] = useState(0); // all jacked up
  const [lastVisitDate, setLastVisitDate] = useState(''); // all jacked up
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(true);

  const cookieName = 'masterpieces';

  useEffect(() => {
    const cookie = getCookie();
    if (cookie && cookie.name) {
      setName(cookie.name);
      setNameIsSet(true);

      const lastVisitDate = new Date(cookie.lastVisitDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset today's date time to 00:00:00

      setPrevItemIndex(cookie.lastItemIndex);
      if (lastVisitDate < today) {
        console.log("increasing the counter!");
        setCurrItemIndex(cookie.lastItemIndex + 1);
        setLastItemIndex(prevIndex => (prevIndex !== undefined ? prevIndex + 1 : 0));
      } else {
        setLastItemIndex(cookie.lastItemIndex);
      }
      
      setLastVisitDate(today.toISOString()); // Update to today's date
      setWelcomeModalOpen(true);
    }
    setTimeout(() => setIsLoading(false), 2000);
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
    setCookie({ name, lastItemIndex: currItemIndex, lastVisitDate: new Date() });
    setWelcomeModalOpen(false);
  };

  const getCookie = () => {
    const cookies = document.cookie.split(';'); // if they put a ';' in the name, you're gonna have a bad time
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

  /**
   * Draws the welcome modal overlay.
   * 
   * This function creates a modal which displays a welcome message to the user.
   * If the user has previously set their name, it greets them with a welcome back message.
   * Otherwise, it shows a generic welcome message.
   *
   * @returns {JSX.Element} The rendered welcome modal component.
   */
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

  const state = 
      isLoading ? 'loading' 
      : welcomeModalOpen ? 'welcome'
      : nameIsSet ? 'showItem'
      : 'intro';

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-20">
      {state == 'welcome' ? drawWelcome() : null}
      {state == 'showItem' ? drawItem() : null }
      {state == 'intro' ? drawIntro() : null }
      {state == 'loading' ? <div>Loading...</div> : null }
    </div>
  );
}

export default App;
