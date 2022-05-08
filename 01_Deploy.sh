cd frontend
npm run build
cd ..
rm -rf backend/public
cp -R frontend/build/ backend/public/
git add *
git commit -m "Automatic building" -a
git push
git push heroku main