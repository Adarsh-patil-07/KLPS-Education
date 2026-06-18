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
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
});

server.listen(3000, async () => {
    console.log('Server running on 3000');
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
        
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
        
        // Wait for router to inject login view
        await page.waitForSelector('#app-root input');
        
        // Check if CSS is applied by checking the computed color of the body or primary element
        const bodyBgColor = await page.evaluate(() => {
            return window.getComputedStyle(document.body).backgroundColor;
        });
        
        const h1Color = await page.evaluate(() => {
            const h1 = document.querySelector('h1');
            return window.getComputedStyle(h1).color;
        });
        
        console.log('Body background-color:', bodyBgColor);
        console.log('H1 color:', h1Color);
        
        await browser.close();
    } catch (e) {
        console.error(e);
    }
    server.close();
});
