const fs = require('fs');
const translate = require('google-translate-api');

// Function to translate JSON content to French
async function translateJsonToFrench(jsonFilePath) {
    var jsonFilePath = './games.json'; 
    try {
        // Read the JSON file
        const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');

        // Parse the JSON data
        const jsonObject = JSON.parse(jsonData);

        // Translate each value in the JSON object
        const translatedObject = await Promise.all(
            Object.keys(jsonObject).map(async key => {
                const translationResult = await translate(jsonObject[key], { from: 'auto', to: 'fr' });
                return { [key]: translationResult.text };
            })
        );

        // Create a new JSON object with translated values
        const translatedJson = Object.assign({}, ...translatedObject);

        // Write the translated JSON back to the file
        fs.writeFileSync(jsonFilePath, JSON.stringify(translatedJson, null, 2), 'utf-8');

        console.log(`Translation of ${jsonFilePath} to French successful.`);
    } catch (error) {
        console.error(`Error translating ${jsonFilePath}: ${error}`);
    }
}

// Example usage
// Replace with your JSON file path
translateJsonToFrench(jsonFilePath);
