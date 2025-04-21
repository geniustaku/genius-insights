// lib/azure-storage.js
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

// Azure Storage Account configuration
const account = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || 'genius-insights';

// Create the BlobServiceClient
const createBlobServiceClient = () => {
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );
  return blobServiceClient;
};

// Get a container client
const getContainerClient = async () => {
  const blobServiceClient = createBlobServiceClient();
  const containerClient = blobServiceClient.getContainerClient(containerName);
  
  // Create the container if it doesn't exist
  try {
    await containerClient.createIfNotExists({
      access: 'blob' // Public access for blobs only
    });
  } catch (error) {
    console.error('Error creating container:', error);
  }
  
  return containerClient;
};

/**
 * Upload a file to Azure Blob Storage
 * @param {Buffer|Blob|ArrayBuffer} fileContent - The content of the file to upload
 * @param {string} fileName - The name to give the file in blob storage
 * @param {string} contentType - The MIME type of the file
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export async function uploadFile(fileContent, fileName, contentType) {
  try {
    const containerClient = await getContainerClient();
    const blobClient = containerClient.getBlockBlobClient(fileName);
    
    await blobClient.upload(fileContent, fileContent.length, {
      blobHTTPHeaders: {
        blobContentType: contentType
      }
    });
    
    return blobClient.url;
  } catch (error) {
    console.error('Error uploading file to Azure Blob Storage:', error);
    throw new Error('Failed to upload file to Azure Blob Storage');
  }
}

/**
 * Delete a file from Azure Blob Storage
 * @param {string} fileName - The name of the file to delete
 * @returns {Promise<void>}
 */
export async function deleteFile(fileName) {
  try {
    const containerClient = await getContainerClient();
    const blobClient = containerClient.getBlockBlobClient(fileName);
    
    await blobClient.delete();
  } catch (error) {
    console.error('Error deleting file from Azure Blob Storage:', error);
    throw new Error('Failed to delete file from Azure Blob Storage');
  }
}

/**
 * Get a list of all files in the storage container
 * @returns {Promise<Array>} - Array of file metadata objects
 */
export async function listFiles() {
  try {
    const containerClient = await getContainerClient();
    const files = [];
    
    for await (const blob of containerClient.listBlobsFlat()) {
      files.push({
        name: blob.name,
        url: `https://${account}.blob.core.windows.net/${containerName}/${blob.name}`,
        contentType: blob.properties.contentType,
        lastModified: blob.properties.lastModified,
        size: blob.properties.contentLength
      });
    }
    
    return files;
  } catch (error) {
    console.error('Error listing files from Azure Blob Storage:', error);
    throw new Error('Failed to list files from Azure Blob Storage');
  }
}

/**
 * Get the public URL for a file
 * @param {string} fileName - The name of the file
 * @returns {string} - The public URL of the file
 */
export function getFileUrl(fileName) {
  return `https://${account}.blob.core.windows.net/${containerName}/${fileName}`;
}