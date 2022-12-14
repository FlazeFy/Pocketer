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