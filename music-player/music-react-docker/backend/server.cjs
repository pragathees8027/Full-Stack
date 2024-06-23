let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');
let he = require('he');
let axios = require('axios').default;
let bcrypt = require('bcryptjs');

let app = express();
app.use(cors());
let PORT = 3001;

mongoose.connect("mongodb://localhost:27017/music_player", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

let itemSchema = new mongoose.Schema({
  id: String,
  name: String,
  artist: { type: String, default: null },
  album: { type: String, default: null },
  img: String,
  url: { type: String, default: null },
  type: String
});

let userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  songs: [itemSchema]
});

userSchema.index({ username: 1 }, { unique: true });

let User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

app.post('/create', async (req, res) => {
  try {
    let { username, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    let newUser = new User({username: username, password: hashedPassword, songs: [], albums: [], artists: []});
    let user = await User.findOne({ username: username });
    if (user) {
      return res.status(200).json({ message: 'User name already taken', user: null, error: 'User found.' });
    }
    let savedUser = await newUser.save(); 
    res.status(201).json({ message: 'success', user: savedUser, error: null });
  } catch (err) {
    console.error(err);
    res.status(201).json({ message: 'error', user: null, error: err });
  }
});

app.post('/add', async (req, res) => {
  try {
    let { username, item } = req.body;
    console.log(username, item);

    let user = await User.findOne({ username: username });
    let itemExists = user.songs.some(song => song.id === item.id);

    if (!itemExists) {
      user.songs.push(item);
      let updatedUser = await user.save();
      console.log('Item added to songs.');
      res.status(200).json({ message: 'success', user: user, error: 'Item added to songs.' });
    } else {
      console.log('Item already exists in songs array.');
      res.status(200).json({ message: 'duplicate', user: user, error: 'Item already exists in library.' });
    }
  } catch(err) {
    console.error(err);
    res.status(200).json({ message: 'error', user: null, error: err });
    return;
  }
});

app.post('/remove', async (req, res) => {
  try {
    let { username, item } = req.body;
    console.log(username, item);
    let user = await User.findOne({ username: username });

    if (!user) {
      console.log('User not found.');
      return res.status(200).json({ message: 'error', error: 'User not found.' });
    }

    let itemExists = user.songs.some(song => song.id === item.id);

    if (itemExists) {
      user.songs = user.songs.filter(song => song.id !== item.id);
      let updatedUser = await user.save();
      console.log('Item removed from songs.');
      res.status(200).json({ message: 'success', user: updatedUser, error: null });
    } else {
      console.log('Item not found in songs array.');
      res.status(200).json({ message: 'error', user: user, error: 'Item not found in library.' });
    }
  } catch(err) {
    console.error(err);
    res.status(200).json({ message: 'error', user: null, error: err.message });
  }
});


app.post('/usersongs', async (req, res) => {
  try {
    let { username } = req.body;
    console.log(username);
    let user = await User.findOne({ username: username });

    if (!user) {
      return res.status(200).json({ message: 'error', error: 'User not found' });
    }

    let data = user.songs;
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: 'error', error: 'Server Error' });
  }
});


app.post('/login', async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(200).json({ message: 'error', user: null, error: 'User not found.' });
    }
    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(200).json({ message: 'error', user: null, error: 'Wrong password'});
    }
    res.status(200).json({ message: 'success', user: user, error: null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error', user: null, error: 'Internal server error.' });
  }
});

app.post('/search', async (req, res) => {
  let { query, searchType, page } = req.body;
  let options;
  if (searchType == 'songs') {
      options = {
      method: 'GET',
      url: 'https://saavn.dev/api/search/songs',
      params: {query: query, limit: 40, page: page}
    };
  } else if (searchType == 'albums') {
      options = {
      method: 'GET',
      url: 'https://saavn.dev/api/search/albums',
      params: {query: query, limit: 40, page: page}
    };
  } else if (searchType == 'artists') {
    options = {
    method: 'GET',
    url: 'https://saavn.dev/api/search/artists',
    params: {query: query, limit: 40, page: page}
  };
}
 
  try {
    let { data } = await axios.request(options);
    console.log(data);
    let pageLimit = Math.ceil((data.data.total - data.data.start) / 40);
    let extractedResults = data.data.results.filter(result => result && result.name).map(result => {
      let id = result.id || null;
      let name = result.name || null;
      name = he.decode(name);
      let artist;
      if (searchType != 'artists') {
        artist = result.artists?.primary[0]?.name || null;
        artist = artist ? he.decode(artist) : null;
      }
      let album;
      let url;
      if (searchType == 'songs'){
        album = result.album?.name || null;
        album = album ? he.decode(album) : null;
        url = result.downloadUrl?.[0]?.url || null;
      }
      let type = result.type || null;
      let img = result.image?.[2]?.url || null;

      return { id, name, artist, album, type, img, url };
    });
    console.log(extractedResults);
    console.log(pageLimit);
    let responseData = {
      data: extractedResults,
      totalPages: pageLimit
  };
    res.json(responseData);
  } catch (error) {
    console.error(error);
  }
}); 



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
