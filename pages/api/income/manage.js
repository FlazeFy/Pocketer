import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    database: "pocketer",
    // port: 8889,
    user: "root",
  });

  switch (req.method) {
    case 'POST':
      try {
        const body = JSON.parse(req.body)
        const user_id = 1 //for now
        const wallet_id = body.wallet_id
        const wallet_balance = body.wallet_balance
        const income_source = body.income_source
        const income_desc = body.income_desc
        const income_category = body.income_category
        const income_price = body.income_price
        const created_at = new Date()
        const updated_at = new Date()
        
        dbconnection.query("INSERT INTO " +
          "income (id, user_id, wallet_id, income_source, income_desc, income_category, income_price, income_created_at, income_updated_at) " +
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
          [null, user_id, wallet_id, income_source, income_desc, income_category, income_price, created_at, updated_at], (error, rows, fields) => {
          if (error) {
            res.status(400).json({ msg: "Error :" + error })
          } else {
            res.status(200).json({ msg: "Update Item Success",status:200, data: rows })
          }
        })
        dbconnection.query("UPDATE " +
          "wallet SET wallet_balance = ?, wallet_updated_at = ? " +
          "WHERE id = ? ", 
          [wallet_balance, updated_at, wallet_id], (errorUpdate, rowsUpdate, fields) => {
          if (errorUpdate) {
            res.status(400).json({ msg: "Error :" + errorUpdate })
          } else {
            res.status(200).json({ msg: "Update Item Success",status:200, data: rowsUpdate })
          }
        })

        //Check this respond status
      } catch (error) {
        console.log("Post data error");
      }
      break;
    case 'PUT':
      try {
        const body = JSON.parse(req.body)
        const id = body.id
        const income_source = body.income_source
        const income_desc = body.income_desc
        const income_category = body.income_category
        const income_price = body.income_price
        const updated_at = new Date()
        
        dbconnection.query("UPDATE " +
          "income SET income_source = ?, income_desc = ?, income_category = ?, income_price = ?, income_updated_at = ? " +
          "WHERE id = ? ", 
          [income_source, income_desc, income_category, income_price, updated_at, id], (error, rows, fields) => {
          if (error) {
              res.status(400).json({ msg: "Error :" + error })
          } else {
              res.status(200).json({ msg: "Update Item Success",status:200, data: rows })
          }
        })
      } catch (error) {
        console.log("Put data error");
      }
    break;
    case 'DELETE':
      const body = JSON.parse(req.body)
      const id = body.id
      const wallet_id = body.wallet_id
      const wallet_balance = body.wallet_balance
      const updated_at = new Date()
      
      dbconnection.query("DELETE " +
        "FROM `income`" +
        "WHERE id = ? ", 
        [id], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Delete Item Success",status:200, data: rows })
        }
      })

      dbconnection.query("UPDATE " +
        "wallet SET wallet_balance = ?, wallet_updated_at = ? " +
        "WHERE id = ? ", 
        [wallet_balance, updated_at, wallet_id], (errorUpdate, rowsUpdate, fields) => {
        if (errorUpdate) {
          res.status(400).json({ msg: "Error :" + errorUpdate })
        } else {
          res.status(200).json({ msg: "Update Item Success",status:200, data: rowsUpdate })
        }
      })
    break;
    default: 
      try {
        const query = "SELECT income.id, wallet_id, income_source, income_desc, income_category, income_price, income_updated_at, wallet_balance, income_created_at "+ 
          "FROM `income` LEFT JOIN `wallet` ON income.wallet_id = wallet.id WHERE income.user_id = 1 ORDER BY income_created_at DESC";
        const values = [];
        const [data] = await dbconnection.execute(query, values);
        dbconnection.end();

        //res.status(200).json({ products: data });
        res.status(200).json({ msg: data.length + " Data retrived", status: 200, data: data})
      } catch (error) {
        console.log("Fetch data error");
      }
  }
}