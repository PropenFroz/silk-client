# Menggunakan image node.js versi 18
FROM node:18

# Menetapkan direktori kerja di dalam container
WORKDIR /app

# Menyalin file package.json dan package-lock.json (atau yarn.lock jika ada)
COPY package*.json ./

# Menginstal dependensi menggunakan npm ci
RUN npm install

# Menyalin seluruh kode sumber aplikasi ke dalam container
COPY . .

# Membangun aplikasi dengan perintah npm run build
RUN npm run build

# Menjalankan aplikasi dengan perintah npm run start
CMD ["npm", "start"]
