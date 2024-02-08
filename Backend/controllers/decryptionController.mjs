// decryptionController.mjs
import { decryptData as decryptDataService } from '../services/kmsService.mjs';

async function decryptDataController(encryptedData) {
  try {
    const decryptedData = await decryptDataService(encryptedData);
    console.log('Decrypted Data:', decryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Decryption failed:', error);
    throw error;
  }
}

export { decryptDataController };

