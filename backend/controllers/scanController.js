const axios = require('axios');

exports.scanBarcode = async (req, res) => {
  const { barcode } = req.body;
  if (!barcode) return res.status(400).json({ error: 'Barcode is required.' });

  try {
    const productDetails = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);

    if (!productDetails.data.product) return res.status(404).json({ error: 'Product not found.' });

    const product = productDetails.data.product;
    
    // Health Risk Warnings
    const healthWarnings = [];
    if (product.nutriments.sugars_100g > 20) healthWarnings.push('High sugar content. Limit consumption.');
    if (product.nutriments.sodium_100g > 0.5) healthWarnings.push('High sodium content. Limit consumption.');
    if (product.nutriments.trans_fat_100g > 0) healthWarnings.push('Contains trans fat. Avoid for better health.');

    res.json({
      name: product.product_name,
      ingredients: product.ingredients_text,
      nutrients: {
        sugar: product.nutriments.sugars_100g,
        sodium: product.nutriments.sodium_100g,
        transFat: product.nutriments.trans_fat_100g,
      },
      healthWarnings,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process barcode.' });
  }
};
