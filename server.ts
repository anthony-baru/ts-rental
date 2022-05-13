import app from "./app";
import connection from "./config/connection";

const PORT = parseInt(process.env.PORT!) || 3000;
const start = async (): Promise<void> => {
    try {

        // await connection.authenticate();
        // await connection.sync({ alter: true });
        app.listen(PORT, () => {
            // init();
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.error("LOADING_ERROR", error);
        process.exit(1);
    }
};

void start();