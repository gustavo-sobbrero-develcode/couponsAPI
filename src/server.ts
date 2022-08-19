import app from "./app";
import { PORT } from "./constants/develfoodApi.constants";

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
