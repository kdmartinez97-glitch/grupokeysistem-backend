const db = require('../config/db');

async function run() {
    try {
        const [columns] = await db.query("DESCRIBE productos");
        console.log("COLUMNS:", columns);
    } catch(e) {
        console.error("Error describing table:", e);
    } finally {
        process.exit();
    }
}
run();
