//Routes for Tour Resources

const express = require('express');
const tourController = require('./../controllers/tourController');

const tourRouter = express.Router();

tourRouter
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.createTour);

tourRouter
  .route('/:id')
  .get(tourController.getCustomTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
