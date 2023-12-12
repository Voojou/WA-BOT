clear
echo "Please wait, Installing curl..."
sudo apt-get install curl -y
clear
echo "Please wait, Installing ffmpeg..."
sudo apt-get install ffmpeg -y
clear
echo "Please wait, Installing webp..."
sudo apt-get install webp -y
clear
echo "Please wait, Installing imagemagick..."
sudo apt-get install imagemagick -y
clear
echo "Please wait, Installing nodejs..."
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install nodejs -y
clear
echo "Please wait, Installing tesseract-ocr..."
sudo apt-get install tesseract-ocr -y
clear
echo "Please wait, Installing node_modules..."
sudo npm install
echo "installing finished..."
