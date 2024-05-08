import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [windowPrevState, setWindowPrevState] = useState([]);
    const [windowCurrState, setWindowCurrState] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [average, setAverage] = useState(null);

    const fetchNumbers = async (type) => {
        try {
            const response = await axios.get(`http://20.244.56.144/test/${type}`);
            const fetchedNumbers = response.data.numbers;

            const uniqueNumbers = fetchedNumbers.filter(num => !numbers.includes(num));
            const newNumbers = [...numbers, ...uniqueNumbers].slice(-10);

            setWindowPrevState([...windowCurrState]);
            setWindowCurrState(newNumbers);
            setNumbers(newNumbers);

            const sum = newNumbers.reduce((acc, curr) => acc + curr, 0);
            const avg = sum / newNumbers.length;
            setAverage(avg.toFixed(2));
        } catch (error) {
            console.error('Error fetching numbers:', error.message);
        }
    };

    return (
        <div className="App">
            <button onClick={() => fetchNumbers('e')}>Fetch Even Numbers</button>
            <button onClick={() => fetchNumbers('p')}>Fetch Prime Numbers</button>
            <button onClick={() => fetchNumbers('rand')}>Fetch Random Numbers</button>
            
            <h2>Previous Window State: {windowPrevState.join(', ')}</h2>
            <h2>Current Window State: {windowCurrState.join(', ')}</h2>
            <h2>Numbers: {numbers.join(', ')}</h2>
            <h2>Average: {average}</h2>
        </div>
    );
}

export default App;

