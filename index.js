const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth'); 
const updateUser = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const bodyParser = require('body-parser');
//image save
const multer = require('multer');
const path = require('path');
 
dotenv.config();
  
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));
  
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
  })
  .then(console.log('connect db'))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Image save
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
}); 

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

app.use('/api/auth', authRoute);
app.use('/api/users', updateUser);
app.use('/api/posts', postRoute);
app.use('/api/category', categoryRoute);

app.listen('5000', () => {
  console.log('backend is run');
});
