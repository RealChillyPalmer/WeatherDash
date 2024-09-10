import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name
  // TODO: save city to search history
  const cityName = req.body.cityName;

});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  HistoryService.getSearchHistory()
  .then((searchHistory: string) => {
    res.status(200).json(searchHistory);
  })
  .catch((err: string) => {
    console.log(err)
  });
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});

export default router;
