Node JS with express:

Install NVM (macOS / Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

After installation, reload your shell:
source ~/.bashrc   # or ~/.zshrc if you use Zsh

nvm --version

nvm install --lts && nvm alias default lts/*
Or, simply: nvm install 24
node -v
npm -v

Installing and then running express-generator but does not install the package on your system
npx express-generator projectName --view=pug

This does three things:
Creates a folder called libraryProject
Generates a full Express app structure
Creates a package.json file with dependencies like:
express, pug, morgan etc.

⚠️ But it does NOT install the dependencies.

cd projectName
npm install

This creates the node_modules and installs everything 
listed in the generated package.json, including: 
express, pug and other middleware

Now inside the project run:
npm install mongoose dotenv cors morgan
They will automatically be added to package.json

npm install express mongoose pug
npm install --save-dev nodemon

"scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www",
    "serverstart": "DEBUG=libraryProject:* npm run devstart"
  }


Before, npm start
Now, npm run devstart
http://localhost:3000/


npm install mongodb












