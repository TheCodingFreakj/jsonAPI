//Routes Handler for tour  resources
const express = require('express');
var fs = require('fs');

var obj = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

exports.getAllTour = (req, res) => {
  res.status(200).json({
    status: 'Successfully sent the tours data',
    result: obj.length,
    data: {
      tours: obj,
    },
  });
};

exports.createTour = (req, res) => {
  //console.log(req.body);
  //console.log(obj[obj.length - 1].id + 1);

  const newId = obj[obj.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  obj.push(newTour);

  fs.writeFileSync(
    'dev-data/data/tours-simple.json',
    JSON.stringify(obj),
    (err) => {
      res.status(201).json({
        status: 'New Tour Successfully Created at the end',
        data: {
          obj: newTour,
        },
      });
    }
  );
};

exports.getCustomTour = (req, res) => {
  console.log(req.params); //Gives the id which is the params
  const id = req.params.id * 1;
  const tour = obj.find((ob) => ob.id === id);

  if (id > obj.length) {
    return res.status(404).json({
      status: 'Failed',
      message: "This tour can't be found",
    });
  }

  res.status(200).json({
    status: 'Got your tour requested',
    data: {
      obj: tour,
    },
  });
};

exports.updateTour = (req, res) => {
  if (req.params.id * 1 > obj.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'invalid tour',
    });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      obj: 'updated tour sent',
    },
  });
};

exports.deleteTour = (req, res) => {
  if (req.params.id * 1 > obj.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Canot delete tour',
    });
  }

  res.status(204).json({
    status: 'success',
    data: {
      obj: null,
    },
  });
};
