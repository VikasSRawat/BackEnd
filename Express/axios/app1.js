import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());


const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000, // 5 sec timeout
  headers: {
    'Content-Type': 'application/json',
    'Custom-Header': 'AxiosPractice'
  }
});

// Route using the custom instance
app.get('/custom-users', async (req, res) => {
  try {
    const response = await apiClient.get('/users');
    res.json(response.data);
  } catch (error) {
    console.error('Custom Axios error:', error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/chain', async (req, res) => {
  try {
    const users = await axios.get('https://jsonplaceholder.typicode.com/users');
    const user = users.data[0];

    const postData = {
      title: 'Post by Axios Chain',
      body: `Post created by ${user.name}`,
      userId: user.id
    };

    const newPost = await axios.post('https://jsonplaceholder.typicode.com/posts', postData);

    res.json({ user, newPost: newPost.data });
  } catch (error) {
    res.status(500).json({ error: 'Chain request failed' });
  }
});


app.post('/add-post', async (req, res) => {
  try {
    const postData = {
      title: 'Axios Test',
      body: 'This is a test post sent using Axios from Node.js',
      userId: 101
    };

    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postData);

    res.json({
      message: 'Post created successfully!',
      data: response.data
    });
  } catch (error) {
    console.error('Axios POST error:', error.message);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
