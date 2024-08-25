import React, { useEffect, useState } from 'react';

interface Rates {
    [key: string]: number;
  }
  


const Home: React.FC = () => {
    const [rates, setRates] = useState<Rates>({});
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [convertedAmount, setConvertedAmount] = useState<number | undefined>(undefined);

    

// access the api key from .env file

const API_KEY = import.meta.env.VITE_API_KEY;

useEffect(() => {
    if(API_KEY){
        fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
        .then((response) => response.json())
        .then((data) => {
          setRates(data.conversion_rates);
        })
        .catch((error) => console.error('Error fetching the rates:', error));
    
    }
    else{
        console.log('API key is missing')
    }
 
    }, [API_KEY]);

  const handleConvert = () => {
    if (rates && amount !== undefined) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount(amount * rate);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="font-bold text-4xl text-center text-gray-800 mb-6">Currency Converter</h1>
        
        <div className="space-y-6">
          {/* Currency to convert from */}
          <div>
            <label className="block text-gray-700 text-lg mb-2" htmlFor="fromCurrency">
             From:
            </label>
            <select  id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className=" px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
           >
             {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
           </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter the amount"
              className="w-full px-4 mt-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Currency to convert to */}
          <div>
            <label className="block text-gray-700 text-lg mb-2" htmlFor="ind">
             To:
            </label>
            <select  id="toCurrency"
            value={toCurrency}
            onChange={(e)=> setToCurrency(e.target.value)}
             className=" px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                  {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={convertedAmount}
              readOnly
              placeholder="Converted amount"
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
          onClick={handleConvert}
           className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Convert
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
