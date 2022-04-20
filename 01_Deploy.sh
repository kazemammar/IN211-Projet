cd frontend
npm run build
cp -r build/ ../backend/public/
git add
git commit -m "Auatamtic building" -a
git push
git push heroku main