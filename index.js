import express from "express";

const app = express();

app.listen(5000, () => {
    console.log("Example app listening on port 5000");
});

app.post("/canciones", (req, res) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    canciones.push(cancion);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("Producto agregado con éxito!");
})

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    res.json(canciones);
});

app.put("/canciones/:id", (req, res) => {
    const { id } = req.params
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    const index = canciones.findIndex(p => p.id == id)
    canciones[index] = cancion
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
    res.send("Producto modificado con éxito")
})

    