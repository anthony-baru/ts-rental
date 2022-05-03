import app from "./app";
import connection from "./config/connection";

const PORT = parseInt(process.env.PORT!) || 3000;
const start = async (): Promise<void> => {
    try {
        await connection.sync();

        console.log(connection.models);

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.error("LOADING_ERROR", error);
        process.exit(1);
    }
};

void start();