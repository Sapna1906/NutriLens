import React, { useState } from 'react';
import axios from 'axios';

function Scan() {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);

  const handleScan = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/scan', { barcode });
      setProduct(response.data);
    } catch (error) {
      console.error('Error scanning barcode:', error);
    }
  };

  return (
    <div>
      <h1>Scan a Product</h1>
      <input type="text" value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="Enter barcode" />
      <button onClick={handleScan}>Scan</button>

      {product && (
        <div>
          <h2>{product.name}</h2>
          <p><strong>Ingredients:</strong> {product.ingredients}</p>
          <p><strong>Sugar:</strong> {product.nutrients.sugar}g</p>
          <p><strong>Sodium:</strong> {product.nutrients.sodium}g</p>
          <p><strong>Trans Fat:</strong> {product.nutrients.transFat}g</p>
          <h3>Health Warnings:</h3>
          <ul>
            {product.healthWarnings.map((warning, index) => (
              <li key={index} style={{ color: 'red' }}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Scan;
