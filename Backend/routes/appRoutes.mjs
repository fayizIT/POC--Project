//appRoutes.mjs
import { Router } from 'express';
import { encryptDataController } from '../controllers/encryptionController.mjs';
import { decryptDataController } from '../controllers/decryptionController.mjs';

const router = Router();

// Route to encrypt data
router.post('/encrypt', async (req, res) => {
  const { data, keyId } = req.body;
  try {
    const encryptedData = await encryptDataController(data, keyId);
    res.json({ encryptedData });
  } catch (error) {
    console.error('Error in encryption route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to decrypt data
router.post('/decrypt', async (req, res) => {
  const { encryptedData } = req.body;
  try {
    const decryptedData = await decryptDataController(encryptedData);
    res.json({ decryptedData });
  } catch (error) {
    console.error('Error in decryption route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
