const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple static server for dist
const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url);
    if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
    }
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.js') contentType = 'text/javascript';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.png') contentType = 'image/png';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
});

server.listen(3000, async () => {
    console.log('Server running on 3000');
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        page.on('response', response => {
            if (response.status() === 404) {
                console.log('404 Error URL:', response.url());
            }
        });
        
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
        
        await browser.close();
    } catch (e) {
        console.error(e);
    }
    server.close();
});
