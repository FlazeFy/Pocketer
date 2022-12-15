import mysql from "mysql2/promise";

export default async function handler(req, res) {
    const dbconnection = await mysql.createConnection({
        host: "localhost",
        database: "pocketer",
        // port: 8889,
        user: "root",
    });

    switch (req.method) {
        case 'PUT':
        try {
            const body = JSON.parse(req.body)
            const id = body.id
            const wallet_name = body.wallet_name
            const wallet_desc = body.wallet_desc
            const wallet_type = body.wallet_type
            const wallet_balance = body.wallet_balance
            const updated_at = new Date()
            
            dbconnection.query("UPDATE " +
            "wallet SET wallet_name = ?, wallet_desc = ?, wallet_type = ?, wallet_balance = ?, wallet_updated_at = ? " +
            "WHERE id = ? ", 
            [wallet_name, wallet_desc, wallet_type, wallet_balance, updated_at, id], (error, rows, fields) => {
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
            const id = body.id //wallet id
            const user_id = 1 //for now
            var setting
            var set
            const updated_at = new Date()
            
            const query = "SELECT * "+
                "FROM `setting` WHERE user_id = "+ user_id;
            const values = [];
            const [data] = await dbconnection.execute(query, values);
            // dbconnection.end();

            data.forEach(element => {
                setting = element.setting_config

                //Make valid json.
                let result = setting.replace(/'/g, '"');
                var data2 = JSON.parse(result);

                //Get setting value.
                data2.forEach(element2 => {
                    if(element2.type == "delete_wallet_with_item"){
                        set = element2.value 
                    }
                });
            });
                
            if(!set){
                dbconnection.query("DELETE " +
                    "FROM `wallet`" +
                    "WHERE id = ? ", 
                    [id], (error2, rows2, fields) => {
                    if (error2) {
                        res.status(400).json({ msg: "Error :" + error2 })
                    } else {
                        res.status(200).json({ msg: "Delete Wallet Success", status:200, data: rows2 })
                    }
                })
            } else {
                dbconnection.query("UPDATE " +
                "income SET wallet_id = 0, income_updated_at = ? " +
                "WHERE wallet_id = ? ", 
                [updated_at, id], (error3, rows3, fields) => {
                if (error3) {
                    res.status(400).json({ msg: "Error :" + error3 })
                } else {
                    res.status(200).json({ msg: "Item updated",status:200, data: rows3 })
                }
                })

                dbconnection.query("UPDATE " +
                "purchased SET wallet_id = 0, purchased_updated_at = ? " +
                "WHERE wallet_id = ? ", 
                [updated_at, id], (error4, rows4, fields) => {
                if (error4) {
                    res.status(400).json({ msg: "Error :" + error4 })
                } else {
                    res.status(200).json({ msg: "Item updated",status:200, data: rows4 })
                }
                })

                dbconnection.query("DELETE " +
                    "FROM `wallet`" +
                    "WHERE id = ? ", 
                    [id], (error5, rows5, fields) => {
                    if (error5) {
                        res.status(400).json({ msg: "Error :" + error5 })
                    } else {
                        res.status(200).json({ msg: "Delete Wallet Success",status:200, data: rows5 })
                    }
                })
            }
        } catch (error) {
            console.log("Delete data error");
        }
        break;
    default:
        try {
            const query = "SELECT * "+
                "FROM `wallet` WHERE user_id = 1 ORDER BY wallet_balance DESC";
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