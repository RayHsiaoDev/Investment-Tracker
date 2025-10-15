const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const indexHtmlPath = path.join(projectRoot, 'index.html');

const html = fs.readFileSync(indexHtmlPath, 'utf8');

const checks = [
  {
    description: 'includes Firebase configuration guard',
    pattern: /Missing Firebase configuration/,
  },
  {
    description: 'renders instructions for missing Firebase keys',
    pattern: /renderFirebaseSetupInstructions/,
  },
  {
    description: 'contains sample window.__firebase_config snippet',
    pattern: /window.__firebase_config/,
  },
  {
    description: 'imports Firebase Firestore helpers including where',
    pattern: /from\s+"https:\/\/www\.gstatic\.com\/firebasejs\//,
  },
];

let hasErrors = false;

checks.forEach(({ description, pattern }) => {
  if (!pattern.test(html)) {
    console.error(`❌ ${description} not found in index.html`);
    hasErrors = true;
  } else {
    console.log(`✅ ${description}`);
  }
});

if (hasErrors) {
  process.exitCode = 1;
} else {
  console.log('\nAll Firebase setup smoke tests passed.');
}
