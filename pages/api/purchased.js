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
        const purchased_name = body.purchased_name
        const purchased_desc = body.purchased_desc
        const purchased_category = body.purchased_category
        const purchased_price = body.purchased_price
        const created_at = new Date()
        const updated_at = new Date()
        
        dbconnection.query("INSERT INTO " +
          "purchased (id, user_id, wallet_id, purchased_name, purchased_desc, purchased_category, purchased_price, purchased_created_at, purchased_updated_at) " +
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
          [null, user_id, wallet_id, purchased_name, purchased_desc, purchased_category, purchased_price, created_at, updated_at], (error, rows, fields) => {
          if (error) {
              res.status(400).json({ msg: "Error :" + error })
          } else {
              res.status(200).json({ msg: "Insert Item Success",status:200, data: rows })
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
        const purchased_name = body.purchased_name
        const purchased_desc = body.purchased_desc
        const purchased_category = body.purchased_category
        const purchased_price = body.purchased_price
        const updated_at = new Date()
        
        dbconnection.query("UPDATE " +
          "purchased SET purchased_name = ?, purchased_desc = ?, purchased_category = ?, purchased_price = ?, purchased_updated_at = ? " +
          "WHERE id = ? ", 
          [purchased_name, purchased_desc, purchased_category, purchased_price, updated_at, id], (error, rows, fields) => {
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
      try {
        const body = JSON.parse(req.body)
        const id = body.id
        const wallet_id = body.wallet_id
        const wallet_balance = body.wallet_balance
        const updated_at = new Date()
        
        dbconnection.query("DELETE " +
          "FROM `purchased`" +
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
      } catch (error) {
        console.log("Put data error");
      }
      break;
    default: 
      try {
        const query = "SELECT purchased.id, wallet_id, purchased_name, purchased_desc, purchased_category, purchased_price, purchased_updated_at, wallet_balance, purchased_created_at " + 
          "FROM `purchased` JOIN `wallet` ON purchased.wallet_id = wallet.id WHERE purchased.user_id = 1 ORDER BY purchased_created_at DESC";
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