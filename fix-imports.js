const fs = require('fs');
const path = require('path');

// Function to recursively get all .js files
function getAllJSFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllJSFiles(filePath));
    } else if (file.endsWith('.js')) {
      results.push(filePath);
    }
  });
  return results;
}

// Function to fix imports in a file
function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Fix the imports
  const replacements = [
    { from: "from '../../styles/GlobalStyle'", to: "from '../../../styles/GlobalStyle'" },
    { from: "from '../../DummyData'", to: "from '../../../DummyData'" },
    { from: "from '../../store/", to: "from '../../../store/" },
    { from: "from '../../components/", to: "from '../../../components/" },
    { from: "from '../../utils/", to: "from '../../../utils/" },
    { from: "from '../../DummyData/", to: "from '../../../DummyData/" }
  ];

  replacements.forEach(replacement => {
    if (content.includes(replacement.from)) {
      content = content.replaceAll(replacement.from, replacement.to);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed imports in ${filePath}`);
  }
}

// Main execution
const modulesDir = path.join(__dirname, 'src', 'modules');
if (fs.existsSync(modulesDir)) {
  const jsFiles = getAllJSFiles(modulesDir);
  console.log(`Found ${jsFiles.length} JS files to check`);
  
  jsFiles.forEach(filePath => {
    try {
      fixImports(filePath);
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  });
  
  console.log('Import fixing completed!');
} else {
  console.error('modules directory not found');
}
