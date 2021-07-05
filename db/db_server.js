const sqlite3 = require('sqlite3').verbose()


const getTableColumnNames = (database, tableName)=>
{
    return new Promise((res, rej)=>
    {
        let  db = new sqlite3.Database(database)
        const sql = `SELECT name FROM PRAGMA_TABLE_INFO('${tableName}')`
        const collumnNames =[] 
        db.each(sql,[],(err, row)=>
        {
            if(err)
            {
                rej(err)
            }else
            {
                collumnNames.push(row.name)
            }
        },(err, n)=>
        {
            if(err)
            {
                rej(err)
            }else
            {
                db.close
                res(collumnNames)
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
            const data =[] 

            db.each(sql,[], (err,row)=>
            {
                if(err)
                {
                    rej(err)
                }else
                {
                    data.push(row)
                }
                
            },(err, n)=>
            {                
                if(err)
                {
                    rej(err)
                }else
                {   
                    if(n==0)
                    {
                        res(getTableColumnNames(database,tableName))
                    }else
                    {
                        res(data)
                    }
                }
            })
        })

    }

}