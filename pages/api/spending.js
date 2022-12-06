import mysql from "mysql2/promise";

export default async function handler(req, res) {
    const dbconnection = await mysql.createConnection({
        host: "localhost",
        database: "pocketer",
        // port: 8889,
        user: "root",
    });

  
    try {
        const query = "SELECT CAST(purchased_created_at AS DATE) as date, SUM(purchased_price) AS total "+
            "FROM `purchased` WHERE user_id = 1 GROUP BY CAST(purchased_created_at AS DATE) ORDER BY date DESC LIMIT 7";
        const values = [];
        const [data] = await dbconnection.execute(query, values);
        dbconnection.end();

        //res.status(200).json({ products: data });
        res.status(200).json({ msg: data.length + " Data retrived", status: 200, data: data})
    } catch (error) {
        console.log("Fetch data error");
    }
  
}