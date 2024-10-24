import { useState, useReducer, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import axios from 'axios';

const Roulette = () => {
  const ACTIONS = {
    SET_OPTION: 'set_options',
    ADD_OPTION: 'add_option',
    DELETE_OPTION: 'delete_option',
    EDIT_OPTION: 'edit_option' 
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.SET_OPTION:
        return action.payload;
      case ACTIONS.EDIT_OPTION:
        return state.map((item, index) => 
          index === action.payload.index 
            ? { ...item, option: action.payload.newOption }
            : item
        );
      case ACTIONS.ADD_OPTION:
        return [...state, { option: action.payload }];
      case ACTIONS.DELETE_OPTION:
        return state.length > 1
          ? state.filter((_, index) => index !== action.payload)
          : state; // Prevent deleting the last option
      default:
        return state;
    }
  };
  
  const [data, dispatch] = useReducer(reducer, [{ option: '' },]);
  const [mustSpin, setMustSpin] = useState(false);
  const [newOption, setNewOption] = useState('');
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState(''); // State to store the result
  const [storeData, setStoreData] = useState([]); // Data from the backend
  const [editIndex, setEditIndex] = useState(null); // Tracks index of option being edited
  const [editOption, setEditOption] = useState(''); // Tracks the edited value of the option

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/rouletteRead');
        setStoreData(response.data.results);
      } catch (error) {
        console.error('Error details:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber % data.length);
      setMustSpin(true);
    }
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setResult(data[prizeNumber].option); // Set the result based on the prizeNumber
  };

  // Handle adding a new option to the wheel
  const handleInputChange = (e) => {
    setNewOption(e.target.value);
    e.preventDefault();
  };

  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      dispatch({ type: ACTIONS.ADD_OPTION, payload: newOption });
      setNewOption(''); // Clear the input field after adding
    }

    // CREATE OPTION FOR ROULETTE
    const userOption = { option: newOption };

    axios.post('http://localhost:3000/roulette', userOption)
      .then(response => console.log(response))
      .catch(() => console.log('Error in creating a new user'));
  };

  // Handle deleting an option from the wheel
  const handleDeleteOption = (index) => {
    dispatch({ type: ACTIONS.DELETE_OPTION, payload: index });
    
    axios.delete(`http://localhost:3000/roulettes/${index}`)
      .then(response => console.log(response))
      .catch(() => console.log('Error in deleting an option'));
  };

  // Start editing an option
  const handleEditOption = (index) => {
    setEditIndex(index); // Set the index of the option being edited
    setEditOption(data[index].option); // Populate the input with the current option
  };

  // Save edited option
  const handleSaveEdit = () => {
    dispatch({ type: ACTIONS.EDIT_OPTION, payload: { index: editIndex, newOption: editOption } });
    setEditIndex(null); // Exit edit mode

    // UPDATE OPTION IN THE BACKEND
    axios.patch(`http://localhost:3000/roulettes/${editIndex}`, { option: editOption })
      .then(response => console.log(response))
      .catch(() => console.log('Error in updating option'));
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center mt-12 space-x-0 lg:space-x-12 px-4 lg:px-0">
      {/* ROULETTE AND SPIN BUTTON */}
      <div className="flex flex-col items-center lg:w-1/2 w-full">
        <div className="roulette flex flex-col items-center">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={handleStopSpinning} // Call handleStopSpinning when spinning stops
            outerBorderColor="#ffb700"
            outerBorderWidth={10}
            innerRadius={10}
            radiusLineColor="#ffb700"
            radiusLineWidth={5}
            fontSize={18}
            spinDuration={0.7} // Make the spin faster initially
            spinEasing="easeOutCubic" // Easing function for a natural slow down
          />
          <button onClick={handleSpinClick}
            className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-pink-500 hover:to-orange-500 text-xl mt-6 rounded-full px-6 py-3">
            SPIN </button>
        </div>

        {/* ADD OPTION */}
        <div className="flex flex-col lg:flex-row justify-center mt-12 items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <input
            type="text"
            value={newOption}
            onChange={handleInputChange}
            placeholder="Add a new option"
            className="text-lg p-3 rounded-md shadow-sm w-full max-w-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button onClick={handleAddOption}
            className="text-white hover:bg-stone-500 bg-neutral-600 text-lg px-6 py-3 rounded-lg shadow-md transition-all">
            Add Option</button>
        </div>

        {/* RESULT */}
        <p className="text-2xl font-semibold mt-12 text-gray-700 text-center">
          RESULT: {result}
        </p>
      </div>

      {/* OPTIONS LIST */}
      <div className="mt-20 lg:ml-10 w-full lg:w-1/3">
        <h3 className="text-xl font-semibold text-center">Options:</h3>
        <ul className="mt-4">
          {data.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editOption}
                    onChange={(e) => setEditOption(e.target.value)}
                    className="text-lg p-3 rounded-md shadow-sm w-full max-w-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 ml-2 rounded-lg shadow-md transition-all"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{item.option}</span>
                  <div>
                    <button
                      onClick={() => handleEditOption(index)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-all mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteOption(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>  
    </div>
  );
};

export default Roulette;
