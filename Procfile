web: cd client && npm start
api: bundle exec rails s -p 3001



"build": "cd client && npm install && npm run build && cd ..",
"deploy": "cp -a client/build/. public/",
"postinstall": "npm run build && npm run deploy"
