import { Router } from 'express';
import fs from 'fs';

const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';


// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name
  const { cityName } = req.body;
  console.log('14 City Name', cityName)
  
  WeatherService.getWeatherForCity(cityName)
    .then(response => {
        res.status(200).json(response);
      })
      
      .catch(() => {
        res.status(500).json({ error: 'Error in finding Forecast' })
      });

      
  
  // TODO: save city to search history

  fs.writeFile('searchHistory.json', JSON.stringify(cityName), function(err) {
    if(err) {
      console.log("Can't find City");
    } else {
      console.log(`${cityName} added to History`)
    }
  })
  console.log('wRoutes: 36', cityName)
});

// TODO: GET search history
router.get('/api/history', async (_req, res) => {
  // HistoryService.getCities()
  //   .then((searchHistory) => {
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
    await HistoryService.removeCity(req.params.id);
    res.json({ success: 'City Removed Succesfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
