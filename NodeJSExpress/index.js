const express = require('express');
const bodyParser = require('body-parser');
const koneksi = require('./config/database');
const app = express();
const PORT = process.env.PORT || 5000;

const multer = require('multer')
const path = require('path')
const cors = require('cors');

// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }))

// script upload
app.use(express.static("./public"))
//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
}); // script untuk penggunaan multer saat upload


// create data / insert data
app.post('/api/products', upload.single('images'), (req, res) => {

    const data = { ...req.body };
    const title = req.body.title;
    const price = req.body.price;
    const weight = req.body.weight;
    const detail = req.body.detail;

    if (!req.file) {
        console.log("No file upload");
        const querySql = 'INSERT INTO products (title,price,weight,detail) values (?,?,?,?);';

        // jalankan query
        koneksi.query(querySql, [title, price, weight, detail], (err, rows, field) => {
            // error handling
            if (err) {
                return res.status(500).json({ message: 'Gagal insert data!', error: err });
            }

            // jika request berhasil
            res.status(201).json({ success: true, message: 'Berhasil insert data!' });
        });
    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://localhost:5000/images/' + req.file.filename;
        const foto = imgsrc;
        // buat variabel penampung data dan query sql
        const data = { ...req.body };
        const querySql = 'INSERT INTO products (title,price,weight,detail,foto) values (?,?,?,?,?);';

        // jalankan query
        koneksi.query(querySql, [title, price, weight, detail, foto], (err, rows, field) => {
            // error handling
            if (err) {
                return res.status(500).json({ message: 'Gagal insert data!', error: err });
            }

            // jika request berhasil
            res.status(201).json({ success: true, message: 'Berhasil insert data!' });
        });
    }
});


// read data / get data
app.get('/api/products', (req, res) => {
    // buat query sql
    const querySql = 'SELECT * FROM products';

    // jalankan query
    koneksi.query(querySql, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika request berhasil
        res.status(200).json({ success: true, data: rows });
    });
});


// update data
app.put('/api/products/:id', upload.single('foto'), (req, res) => {
    const id = req.params.id;
    const { title,price,weight,detail } = req.body;
    const foto = req.file ? req.file.filename : null;

        const query = 'UPDATE products SET title = ?, price = ?, weight = ?, detail = ? WHERE nim = ?';
        connection.query(query, [title, foto, price, weight, detail], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui mahasiswa' });
            }

           else {
                res.json({ message: 'Mahasiswa berhasil diperbarui' });
            }
        });
    });
  
// delete data
app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const querySearch = 'SELECT * FROM products WHERE id = ?';
    const queryDelete = 'DELETE FROM products WHERE id = ?';
  
    koneksi.query(querySearch, productId, (err, rows, fields) => {
      if (err) {
        return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
  
      if (rows.length) {
        koneksi.query(queryDelete, productId, (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
          }
  
          if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Berhasil hapus data!' });
          } else {
            res.status(500).json({ success: false, message: 'Gagal menghapus data!' });
          }
        });
      } else {
        res.status(404).json({ message: 'Data tidak ditemukan!', success: false });
      }
    });
  });
  

// buat server nya
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));


