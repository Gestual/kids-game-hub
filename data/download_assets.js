const fs = require('fs');
const https = require('https');
const path = require('path');

const images = {
    'world_map_3d.jpg': 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?q=80&w=1920&auto=format&fit=crop', // Abstract digital map concept
    'region_europe.jpg': 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1920&auto=format&fit=crop', // Paris sunset
    'region_asia.jpg': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1920&auto=format&fit=crop', // Japan temples cherry blossom
    'region_africa.jpg': 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1920&auto=format&fit=crop', // Savanna sunset
    'region_americas.jpg': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1920&auto=format&fit=crop', // Golden gate/Bay area landscape
    'region_oceania.jpg': 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1920&auto=format&fit=crop' // Tropical beach
};

const targetDir = path.join(__dirname, '..', 'games', 'where-is-nil');

Object.entries(images).forEach(([filename, url]) => {
    const dest = path.join(targetDir, filename);
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${filename}`);
        });
    }).on('error', (err) => {
        fs.unlink(dest, () => { });
        console.error(`Error downloading ${filename}:`, err.message);
    });
});
