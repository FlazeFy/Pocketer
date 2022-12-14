import mysql from "mysql2/promise";

export default async function handler(req, res) {
    const dbconnection = await mysql.createConnection({
        host: "localhost",
        database: "pocketer",
        // port: 8889,
        user: "root",
    });

    try {
        const query = "SELECT SUM(wallet_balance) as total, MAX(wallet_updated_at) as lastdate FROM `wallet` WHERE user_id = 1 "+
            "UNION "+
            "SELECT SUM(purchased_price) as total, MAX(purchased_created_at) as lastdate FROM `purchased` WHERE user_id = 1 "+
            "UNION "+
            "SELECT SUM(income_price) as total, MAX(income_created_at) as lastdate FROM `income` WHERE user_id = 1 ";
        const values = [];
        const [data] = await dbconnection.execute(query, values);
        dbconnection.end();

        //res.status(200).json({ products: data });
        res.status(200).json({ msg: data.length + " Data retrived", status: 200, data: data})
    } catch (error) {
        console.log("Fetch data error");
    }
}