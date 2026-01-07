const fs = require('fs');
const path = require('path');

// 1. Define the folder path (public/downloads)
const downloadsDir = path.join(__dirname, 'public', 'downloads');

// 2. Create the folder if it doesn't exist
if (!fs.existsSync(downloadsDir)){
    fs.mkdirSync(downloadsDir, { recursive: true });
    console.log('📂 Created "downloads" folder.');
}

// 3. List of files we need
const files = [
    'binary-coloring.pdf',
    'space-math.pdf',
    'experiments.pdf',
    'python-cheatsheet.pdf',
    'shortcuts.pdf',
    'geometry-hunt.pdf'
];

// 4. Create a dummy file for each one
files.forEach(file => {
    const filePath = path.join(downloadsDir, file);
    const content = `This is a placeholder for ${file}.\n\nIn a real project, you would replace this file with an actual PDF workbook for the kids!`;
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Generated: ${file}`);
});

console.log('\n🎉 Success! Your download buttons will now work.');