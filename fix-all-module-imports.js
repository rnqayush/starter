const fs = require('fs');
const path = require('path');

// Define import path mappings
const importMappings = [
  // Style imports
  {
    from: "import { theme } from '../../styles/GlobalStyle';",
    to: "import { theme } from '../../../styles/GlobalStyle';",
  },
  {
    from: "import styled from 'styled-components';",
    to: "import styled from 'styled-components';",
  }, // no change
  {
    from: "from '../../styles/GlobalStyle'",
    to: "from '../../../styles/GlobalStyle'",
  },

  // Store/Redux imports
  { from: "from '../../store/slices/", to: "from '../../../store/slices/" },

  // DummyData imports
  { from: "from '../../DummyData'", to: "from '../../../DummyData'" },
  { from: "from '../../DummyData/", to: "from '../../../DummyData/" },

  // Utils imports
  { from: "from '../../utils/", to: "from '../../../utils/" },

  // Shared components imports
  {
    from: "from '../../components/shared/",
    to: "from '../../../components/shared/",
  },
  {
    from: "from '../../components/auth/",
    to: "from '../../../components/auth/",
  },
  {
    from: "from '../../components/user/",
    to: "from '../../../components/user/",
  },

  // Cross-module imports (within modules folder)
  { from: "from '../../ecommerce/", to: "from '../ecommerce/" },
  { from: "from '../../hotel/", to: "from '../hotel/" },
  { from: "from '../../automobiles/", to: "from '../automobiles/" },
  { from: "from '../../business/", to: "from '../business/" },
  { from: "from '../../weddings/", to: "from '../weddings/" },
];

function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    importMappings.forEach(mapping => {
      if (content.includes(mapping.from)) {
        content = content.replace(
          new RegExp(mapping.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
          mapping.to
        );
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed imports in: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  let totalFixed = 0;

  items.forEach(item => {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      totalFixed += processDirectory(itemPath);
    } else if (item.endsWith('.js') || item.endsWith('.jsx')) {
      if (fixImportsInFile(itemPath)) {
        totalFixed++;
      }
    }
  });

  return totalFixed;
}

// Process all modules
const modulesPath = './src/modules';
console.log('Starting import path fixes...');
const fixedCount = processDirectory(modulesPath);
console.log(`\nCompleted! Fixed imports in ${fixedCount} files.`);
