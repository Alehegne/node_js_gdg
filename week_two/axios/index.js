//getting random jokes from the APi
const axios = require("./node_modules/axios/index.d.cts");
require("dotenv").config();

const api_base_url = process.env.API_URL;
const api_url = `${api_base_url}/random_joke`;
const dad_jokes_url = "https://icanhazdadjoke.com/";

async function getJokes() {
  try {
    const response = await axios.get(api_url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getDadJokes() {
  try {
    const response = await axios.get(dad_jokes_url, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

getJokes().then((joke) => console.log(joke));
getDadJokes().then((joke) => console.log(joke));
