import { useState } from 'react';

const Bill = () => {
  const [totalBill, setTotalBill] = useState(''); // State for total bill input
  const [numPeople, setNumPeople] = useState(''); // State for number of people input
  const [amountPerPerson, setAmountPerPerson] = useState(''); // State to store the calculated amount per person
  const [debts, setDebts] = useState([]); // State to store debts
  const [debtorName, setDebtorName] = useState(''); // State for debtor name input
  const [debtAmount, setDebtAmount] = useState(''); // State for debt amount input

  const handleBillCalculation = () => {
    const bill = parseFloat(totalBill);
    const people = parseInt(numPeople);

    if (!isNaN(bill) && !isNaN(people) && people > 0) {
      const amount = (bill / people).toFixed(2);
      setAmountPerPerson(amount);
    } else {
      setAmountPerPerson('Invalid input');
    }
  };

  const handleAddDebt = () => {
    if (debtorName.trim() !== '' && !isNaN(parseFloat(debtAmount))) {
      setDebts([...debts, { name: debtorName, amount: parseFloat(debtAmount) }]);
      setDebtorName(''); // Clear the input field
      setDebtAmount(''); // Clear the input field
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-12">
        <h2 className="text-2xl font-semibold mb-4">Split the Bill</h2>
        <input
          type="text"
          value={totalBill}
          onChange={(e) => setTotalBill(e.target.value)}
          placeholder="Enter Total Bill"
          className="text-lg p-3 rounded-md shadow-sm w-full max-w-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-4"
        />
        <input
          type="text"
          value={numPeople}
          onChange={(e) => setNumPeople(e.target.value)}
          placeholder="Enter Number of People"
          className="text-lg p-3 rounded-md shadow-sm w-full max-w-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-4"
        />
        <button
          onClick={handleBillCalculation}
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Calculate
        </button>

        {/* Display Amount Per Person */}
        {amountPerPerson && (
          <p className="text-xl font-semibold mt-6 text-gray-700">
            Amount per person: {amountPerPerson}
          </p>
        )}

        {/* Debt Status */}
        <div className="flex flex-col items-center mt-12 bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-red-500">Debt Status</h3>
          {debts.length > 0 ? (
            debts.map((debt, index) => (
              <p key={index} className="text-lg text-gray-700">
                {debt.name} owes you ${debt.amount.toFixed(2)}
              </p>
            ))
          ) : (
            <p className="text-lg text-gray-700">No debts recorded</p>
          )}

          {/* Add Debt */}
          <input
            type="text"
            value={debtorName}
            onChange={(e) => setDebtorName(e.target.value)}
            placeholder="Enter Debtor's Name"
            className="text-lg p-3 rounded-md shadow-sm w-full max-w-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-4"
          />
          <input
            type="text"
            value={debtAmount}
            onChange={(e) => setDebtAmount(e.target.value)}
            placeholder="Enter Debt Amount"
            className="text-lg p-3 rounded-md shadow-sm w-full max-w-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-4"
          />
          <button
            onClick={handleAddDebt}
            className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-3 rounded-lg shadow-md transition-all mt-4"
          >
            Add Debt
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;
