const express = require('express');
const Rent = require('../models/Rent');
const User = require('../models/User');
const Car = require('../models/car');
const router = express.Router();

// Acción para mostrar el formulario de registro de alquileres
router.get('/add', (req, res) => {
  res.render('addRent');
});

// Acción para guardar un alquiler
router.post('/add', async (req, res) => {
  
  console.log('sdljgbaf')
  const { rentnumber, username, platenumber, rentdate } = req.body;

  try {
    process.stdout._write('edbvgcews')
    const user = await User.findOne({ username });
    const car = await Car.findOne({ platenumber });
    

    if (!user || !car) {
      return res.status(400).send('El usuario o el automóvil no existen');
    }

    const rent = new Rent({ rentnumber, username, platenumber, rentdate });
    await rent.save();
    res.redirect('/rents/list');
  } catch (err) {
    process.stdout._write('ca---')
    console.log(err);
    res.redirect('/rents/add');
  }
});

// Acción para listar alquileres
router.get('/list', async (req, res) => {
  const rents = await Rent.find();
  res.render('listRents', { rents });
});
router.get('*', (req, res) => {
  res.redirect('/rents/list');
});

module.exports = router;
