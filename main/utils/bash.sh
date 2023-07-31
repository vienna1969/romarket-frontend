#!/bin/bash


# Adım 2: update.zip dosyasının içindeki klasörü bul ve içine geç
cd update/
folder_name=$(unzip -Z -1 update.zip | head -n 1 | awk -F/ '{print $1}')
unzip -q update.zip
cd $folder_name
rsync -av --remove-source-files ./ ../../../

cd ../../../


npm run build

# Adım 4: pm2 tüm süreçleri başlat
pm2 restart all