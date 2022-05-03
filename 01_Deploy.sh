cd frontend
npm run build
cp -r build/ ../backend/public/
git add .
git commit -m "Automatic building" -a
git push
git push heroku main