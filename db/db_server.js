const sqlite3 = require('sqlite3').verbose()


const getTableColumnNames = (database, tableName)=>
{
    return new Promise((res, rej)=>
    {
        let  db = new sqlite3.Database(database)
        const sql = `SELECT name FROM PRAGMA_TABLE_INFO('${tableName}')`
        const data = {}
        
        data.collumnNames =[] 
        data.info = {}
        data.info.sql = sql
        data.info.countRecords = 0
        db.each(sql,[],(err, row)=>
        {
            if(err)
            {
                rej(err)
            }else
            {
                data.collumnNames.push(row.name)
               
            }
        },(err, n)=>
        {
            if(err)
            {
                rej(err)
            }else
            {
                db.close
                res(data)
            }
        })
        
    })
}

module.exports = {

    sendQuerry: function(querry)
    {
        let  db = new sqlite3.Database('./db/database')
        db.serialize(()=>{
            db.run(querry)
        })
        db.close()
    },
    showTables: function(database)
    {
        return new Promise((res, rej)=>
        {
            let  db = new sqlite3.Database(database)
            const sqlTables = `SELECT name FROM sqlite_master WHERE type ='table'`
            const tableName =[]  
            db.each(sqlTables,[],(err, row)=>{
                if(err)
                {
                    rej(err)
                }else{
                    tableName.push(row.name)
                }
            },(err, n)=>{
                if(err){
                    rej(err)
                }else{
                    db.close()
                    res(tableName)                    
                }
            })//each                
        })           
    },

    showTheTable: function(database, tableName)
    {
        return new Promise((res, rej)=>
        {
            let  db = new sqlite3.Database(database)
            const sql = `SELECT * FROM ${tableName}`
            
            const data = {}
            data.records = []
            data.collumnNames = []
            data.info = {}
            data.info.sql = sql
            data.info.countRecords = 0

            db.each(sql,[], (err,row)=>
            {
                if(err)
                {
                    rej(err)
                }else
                {
                    data.info.countRecords++
                    data.records.push(row)
                    if(data.info.countRecords==1)
                    {
                        Object.keys(row).map((e) => {data.collumnNames.push(e)})
                    }
                    
                }
                
            },(err, n)=>
            {                
                if(err)
                {
                    rej(err)
                }else
                {   
                    if(data.info.countRecords){res(data)}
                    else
                    {
                        data.collumnNames = getTableColumnNames(database,tableName)
                        res(getTableColumnNames(database,tableName))
                    }
                    
                }
            })
        })

    },
    selectRows: function(database, tableName, querry)
    {
        return new Promise((res, rej)=>{
            let  db = new sqlite3.Database(database)
            const sql = querry

            const data = {}
            data.records = []
            data.collumnNames = []
            data.info = {}
            data.info.sql = sql
            data.info.countRecords = 0


            db.each(sql,[], (err,row)=>
            {
                if(err)
                {
                    rej(err)
                }else
                {
                    data.info.countRecords++
                    data.records.push(row)
                    if(data.info.countRecords==1)
                    {
                        Object.keys(row).map((e) => {data.collumnNames.push(e)})
                    }
                    
                }
            },(err, n)=>
            {                
                if(err)
                {
                    rej(err)
                }else
                {   
                    if(data.info.countRecords){res(data)}
                    else
                    {
                        data.collumnNames = getTableColumnNames(database,tableName)
                        res(getTableColumnNames(database,tableName))
                    }
                    
                }
            })
        })
    }

}