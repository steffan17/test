const db = require("../db/db_server")

const theDatabase = './db/database'

module.exports = {

    testfunk: function(req, res)
    {
        res.send('TestFunk')
    },

    dbOut: function(req, res)
    {
        res.send('data from database')
    },
    dbIn: function(req, res)
    {
        const querryData = req.body.querry
        const jsonstr = JSON.stringify({
            querry: querryData
        })
        res.send(jsonstr)
        const querry = `${querryData}`;
        try {
            db.sendQuerry(querry)
        } catch (error) {
            console.log(error)
        }
       
    },
    showTables: async function(req, res)
    {
        const database = theDatabase
        const tableNames = await db.showTables(database)
        res.send(JSON.stringify(tableNames))
    },
    showTheTable: async function(req, res)
    {
        const database = theDatabase
        const tableName = req.query.tableName
        const theTable = await db.showTheTable(database,tableName)
        res.send(JSON.stringify(theTable))

    }
}
