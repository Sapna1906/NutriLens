const userProfiles = {}; 
const scanHistory = {};

exports.updatePreferences = (req, res) => {
  const { userId, preferences } = req.body;
  if (!userProfiles[userId]) userProfiles[userId] = {};
  userProfiles[userId] = { ...userProfiles[userId], ...preferences };
  res.json({ message: 'Preferences updated successfully.', preferences: userProfiles[userId] });
};

exports.getHistory = (req, res) => {
  const { userId } = req.body;
  res.json({ history: scanHistory[userId] || [] });
};

exports.addExpiryDate = (req, res) => {
  const { userId, barcode, expiryDate } = req.body;
  const historyItem = scanHistory[userId]?.find(item => item.barcode === barcode);
  if (!historyItem) return res.status(404).json({ error: 'Product not found in scan history.' });

  historyItem.expiryDate = expiryDate;
  res.json({ message: 'Expiry date added successfully.', product: historyItem });
};

exports.getExpiryAlerts = (req, res) => {
  const { userId } = req.body;
  const today = new Date();
  const alerts = (scanHistory[userId] || [])
    .filter(item => item.expiryDate && new Date(item.expiryDate) <= today)
    .map(item => ({ product: item.name, expiryDate: item.expiryDate }));

  res.json({ alerts });
};
