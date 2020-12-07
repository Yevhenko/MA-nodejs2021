const fs = require('fs');
const path = require('path');
const { createGunzip } = require('zlib');
const { pipeline } = require('stream');
const { promisify } = require('util');
const { nanoid } = require('nanoid');
const { createCsvToJson } = require('../utils/csvToJson');
const { jsonOptimizer } = require('../utils/optimizeJson');

const promisifiedPipeline = promisify(pipeline);

async function uploadCsv(inputStream) {
  const gunzip = createGunzip();
  const id = nanoid();

  try {
    await fs.promises.mkdir('upload/', { recursive: true });
    console.log('Creating folder');
  } catch (error) {
    console.error('Failed to create folder!', error.message);
    return error;
  }

  const filepath = `upload/${id}.json`;
  const outputStream = fs.createWriteStream(filepath);

  const csvToJson = createCsvToJson();

  try {
    return await promisifiedPipeline(inputStream, gunzip, csvToJson, outputStream);
  } catch (error) {
    console.error('CSV pipeline has failed!', error);
    return error;
  }
}

async function getListOfFiles(response) {
  try {
    const files = await fs.promises.readdir('upload/', { withFileTypes: true });

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(files));
    response.end();
  } catch (error) {
    response.writeHead(500).end('error');
  }
}

async function optimizeJson(url, response) {
  const filename = path.basename(url);
  try {
    await fs.promises.access(`upload/${filename}`);
    jsonOptimizer(filename);
    response.statusCode = 202;
    response.write(JSON.stringify({ status: '202 Accepted' }));
    response.end();
  } catch (error) {
    response.writeHead(500).end('error');
  }
}

module.exports = {
  uploadCsv,
  getListOfFiles,
  optimizeJson,
};
