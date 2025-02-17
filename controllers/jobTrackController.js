const db = require("../config/db");



const createAJob = async (req,res) => {
    try {
        const {company, position, status, applied_date, notes} = req.body;
        const response = await db.query(`INSERT INTO jobs (company, position, status, applied_date, notes) VALUES ($1, $2, $3, $4, $5) RETURNING*`,
             [company, position, status, applied_date, notes]);
             res.status(201).json({ message: "Job added successfully", job: response.rows[0] });
    } catch (error) {
        console.error("Error inserting job:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
    
};


module.exports = { createAJob }