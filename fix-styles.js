const fs = require('fs');
const path = require('path');

// Read the angular.json file
const angularJsonPath = path.join(__dirname, 'angular.json');
const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf8'));

// Update the styles array to only include styles.css
angularJson.projects['Weekly-Timesheet-App'].architect.build.options.styles = ['src/styles.css'];

// Write the updated angular.json back to disk
fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2), 'utf8');

console.log('Updated angular.json to only include styles.css');

// Now update styles.css to include PrimeNG styles
const stylesCssPath = path.join(__dirname, 'src', 'styles.css');
const stylesCss = `/* You can add global styles to this file, and also import other style files */
@import '../node_modules/primeicons/primeicons.css';
@import '../node_modules/primeng/resources/themes/lara-light-blue/theme.css';
@import '../node_modules/primeng/resources/primeng.css';

/* Global Styles */
body {
  font-family: var(--font-family, Arial, sans-serif);
  margin: 0;
  padding: 0;
}

/* Common Form Styles */
.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: flex;
  gap: 15px;
}

.half-width {
  flex: 1;
}

.required {
  color: red;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.error-input {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 4px;
  display: block;
}

/* Modal Common Styles */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 10px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e9ecef;
}

.btn-cancel {
  padding: 8px 16px;
  background: white;
  border: 1px solid #6c757d;
  color: #6c757d;
  border-radius: 4px;
  cursor: pointer;
}

.btn-save {
  padding: 8px 16px;
  background: #0d6efd;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}`;

fs.writeFileSync(stylesCssPath, stylesCss, 'utf8');
console.log('Updated styles.css with PrimeNG imports');
