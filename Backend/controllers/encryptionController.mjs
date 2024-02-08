// encryptionController.mjs
import { encryptData as encryptDataService } from '../services/kmsService.mjs';

async function encryptDataController(dataToEncrypt, keyId) {
  try {
    const encryptedData = await encryptDataService(dataToEncrypt, keyId);
    console.log('Encrypted Data:', encryptedData);
    return encryptedData;
  } catch (error) {
    console.error('Encryption failed:', error);
    throw error;
  }
}

export { encryptDataController };
