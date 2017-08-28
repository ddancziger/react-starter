# React starter for new projects
## Install
  * git clone
  * npm install
  
## Running
  * Development mode: npm start
  * Build: npm run prod
  * Tests: npm test
  
### Using vs code:
  #### Plugins:
    * ESLint
    * Flow language support
    * Debugger for chrome
    
  #### Settings for the user (using flow, prettier-eslint)
  ```javascript
    {
      "window.zoomLevel": 0,
      "git.confirmSync": false,
      "javascript.validate.enable": false,
      "flow.useNPMPackagedFlow": true,
      "editor.formatOnSave": true,
      "javascript.format.enable": false,
      "prettier.eslintIntegration": true
    }
```
  ### Debugger for chrome
    * create a file inside folder .vscode/launch.json and paste
    {
     "version": "0.2.0",
     "configurations": [
        {
          "type": "chrome",
          "request": "launch",
          "name": "Launch Chrome against localhost",
          "url": "http://localhost:9000",
          "webRoot": "${workspaceRoot}"
        },
        {
          "type": "chrome",
          "request": "attach",
          "name": "Attach to Chrome",
          "port": 9222,
          "webRoot": "${workspaceRoot}"
        }
      ]
    }
