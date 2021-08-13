const express = require('express');
const router = express.Router();

const actions = require('./actions');


router.get('/api/', actions.testfunk);
router.get('/api/db', actions.dbOut);
router.post('/api/db', actions.dbIn);
router.get('/api/showTables', actions.showTables);
router.get('/api/showTheTable', actions.showTheTable);


module.exports = router;