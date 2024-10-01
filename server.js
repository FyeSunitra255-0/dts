const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// ตั้งค่า view engine เป็น ejs
app.set('view engine', 'ejs');

// URL สำหรับเชื่อมต่อกับ MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'movies';

// ฟังก์ชันดึงข้อมูลหนังจาก MongoDB
async function getMoviesData() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('moviesData');

    const movies = await collection.find({}).toArray();
    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
  } finally {
    await client.close();
  }
}

// Route สำหรับแสดงข้อมูลหนังใน ejs
app.get('/movies', async (req, res) => {
  const movies = await getMoviesData();
  res.render('movies', { movies }); // ส่งข้อมูล movies ไปยังไฟล์ ejs
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
