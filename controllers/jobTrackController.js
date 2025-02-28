const db = require("../config/db");



const createAJob = async (req,res) => {
    try {
        const {company, position, status = "Applied", applied_date, notes} = req.body;

        const allowedStatuses = ["Applied", "Interviewing", "Offer", "Rejected", "Ghosted"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: `Invalid status. Allowed statuses: ${allowedStatuses.join(", ")}` });
        }

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const response = await db.query(`INSERT INTO jobs (user_id, company, position, status, applied_date, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*`,
             [req.user.id, company, position, status, applied_date, notes]);
             res.status(201).json({ message: "Job added successfully", job: response.rows[0] });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
    
};

const retriveJobs = async (req,res) => {
    try {

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const response = await db.query("SELECT * FROM jobs WHERE user_id = $1", [req.user.id]);

        if (response.rows.length === 0) {
            return res.status(404).json({ message: "No jobs found for this user" });
        }
        res.status(200).json({job: response.rows})
    } catch (error) {
        console.error("Error retrieving jobs:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const retriveAParticularJob = async (req,res) => {
    try {
        const {id} = req.params;

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const response = await db.query(`SELECT * FROM jobs WHERE id = $1 AND user_id = $2`, [id, req.user.id]);

        if (response.rows.length === 0) {
            return res.status(404).json({ message: "Job not found or you do not have permission to view this job" });
        }

        res.status(200).json({job: response.rows[0]})
    } catch (error) {
        console.error("Error retrieving job:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const updateAJob = async (req, res) => {
    try {
        const { id } = req.params;
        let updates = req.body;

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No fields provided for update" });
        }

        if (updates.status) {
            const allowedStatuses = ["Applied", "Interviewing", "Offer", "Rejected", "Ghosted"];
            if (!allowedStatuses.includes(updates.status)) {
                return res.status(400).json({ message: `Invalid status. Allowed: ${allowedStatuses.join(", ")}` });
            }
        }

        const filteredFields = Object.keys(updates).filter(key => key !== "updated_at");

        if (filteredFields.length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update" });
        }

        const jobCheck = await db.query("SELECT * FROM jobs WHERE id = $1 AND user_id = $2", [id, req.user.id]);
        if (jobCheck.rows.length === 0) {
            return res.status(404).json({ message: "Job not found or you do not have permission to update this job" });
        }

        const fields = filteredFields.map((key, index) => `${key} = $${index + 1}`).join(", ");
        const values = filteredFields.map(key => updates[key]);
        values.push(id);

        const query = `UPDATE jobs SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`;
        const response = await db.query(query, values);

        res.status(200).json({ message: "Job updated successfully", job: response.rows[0] });
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const deleteAJob = async (req,res) => {
    try {
        const {id} = req.params;

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const jobCheck = await db.query("SELECT * FROM jobs WHERE id = $1 AND user_id = $2", [id, req.user.id]);
        if (jobCheck.rowCount === 0 === 0) {
            return res.status(404).json({ message: "Job not found or you do not have permission to delete this job" });
        }

        const response = await db.query(`DELETE FROM jobs WHERE id = $1 RETURNING *`, [id]);

        res.status(200).json({ message: "Job deleted successfully", job: response.rows[0]})
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


module.exports = { createAJob, retriveJobs, retriveAParticularJob, updateAJob, deleteAJob }