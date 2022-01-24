import express from "express";
import compression from "compression";
import path from "path";
import routes from "./routes/index.js";
import cors from 'cors';
import helmet from "helmet";

const app = express();

app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/"],
            styleSrc: ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/"],
        },
    },
}));
app.use(compression());
app.use(cors());
app.use(express.static(path.join(path.resolve(), 'client/build')));
app.use(express.json({limit: '16mb'}));
app.use('/api/v1', routes);
app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve()+'/client/build/index.html'));
});

export default app;