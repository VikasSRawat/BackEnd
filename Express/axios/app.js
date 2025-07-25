import express from "express";
import axios from "axios";

const app = express();

const PORT = 3000;

app.use(express.json());


app.get('/error-demo', async (req, res) => {
  try {
    // Typo in URL will throw an error
    const response = await axios.get('https://jsonplaceholder.typicode.com/invalid-url');
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      // Server responded with a non-2xx status
      res.status(error.response.status).json({
        error: 'API responded with error',
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      res.status(408).json({ error: 'No response from server' });
    } else {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
});



app.get('/with-header', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      headers: {
        'Custom-Header': 'MyHeaderValue',
        'Accept': 'application/json'
      }
    });

    res.json(response.data.slice(0, 3)); // Just show first 3 posts
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch with header' });
  }
});


app.get("/users", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    console.error("Axios error:", error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
