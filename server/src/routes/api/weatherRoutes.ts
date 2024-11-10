import { Router } from 'express';
import fs from 'fs';

const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';


// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
  const { cityName } = req.body;
  if (req.body) {
    await WeatherService.getWeatherForCity( cityName)
      .then((weatherData) => {
        res.status(200).json(weatherData);
      })
      .catch(() => {
        res.status(500).send('Error in finding Forecast')
      });
  };  
  //   res.status(200).json(weatherData);
  // } else {
  //   res.status(500).send('Error in finding Forecast')
  // }
  // TODO: save city to search history

  fs.writeFile('searchHistory.json', JSON.stringify(cityName), function(err) {
    if(err) {
      console.log("Can't find City");
    } else {
      console.log('City added to History')
    }
  })
  console.log('37', cityName)
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  // HistoryService.getCities()
  //   .then((searchHistory: City[]) => {
  //     res.status(200).json(searchHistory);
  //   })
  //   .catch((err: string) => {
  //     console.log(err)
  //   })
  try {
    const savedCities = await HistoryService.getCities();
    res.json(savedCities);
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});



// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: 'City id is required' });
    }
    await historyService.removeCity(req.params.id);
    res.json({ success: 'City Removed Succesfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
