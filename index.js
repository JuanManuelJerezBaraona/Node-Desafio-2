import express from "express";
// import { writeFile, readFile } from "node:fs/promises";
import fs from "fs";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    try {
        res.status(200).sendFile(__dirname + "/index.html");
    } catch (error) {
        res.status(404).sendFile({ error: "Error al procesar la solicitud" });
        console.error("Error al procesar la solicitud:", error);
    }
});

app.get("/canciones", (req, res) => {
    try {
        const canciones = JSON.parse(
            fs.readFileSync("repertorio.json", "utf8")
        );
        res.status(200).json(canciones);
    } catch (error) {
        res.status(500).json({ error: "Error al procesar la solicitud" });
        console.error("Error al procesar la solicitud", error);
    }
});

app.post("/canciones", (req, res) => {
    try {
        const cancion = req.body;
        const canciones = JSON.parse(
            fs.readFileSync("repertorio.json", "utf8")
        );
        fs.writeFileSync(
            "repertorio.json",
            JSON.stringify([...canciones, cancion])
        );
        res.status(200).send("Canción agregada con éxito");
    } catch (error) {
        res.status(500).json({ error: "Error al procesar la solicitud" });
        console.error("Error al procesar la solicitud", error);
    }
});

app.put("/canciones/:id", (req, res) => {
    try {
        const { id } = req.params;
        const cancion = req.body;
        const canciones = JSON.parse(
            fs.readFileSync("repertorio.json", "utf8")
        );
        const index = canciones.findIndex((c) => c.id == id);
        canciones[index] = cancion;
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
        res.status(201).send("¡Canción agregada con éxito!");
    } catch (error) {
        res.status(500).json({ error: "Error al procesar la solicitud" });
        console.error("Error al procesar la solicitud:", error);
    }
});

app.delete("/canciones/:id", (req, res) => {
    try {
        const { id } = req.params;
        const index = canciones.findIndex((c) => c.id == id);
        canciones.splice(index, 1);
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
        res.status(204).send("Canción modificada con éxito");
    } catch (error) {
        res.status(500).json({ error: "Error al procesar la solicitud" });
        console.error("Error al procesar la solicitud:", error);
    }
});

app.listen(5000, () => {
    console.log("Server on");
});
