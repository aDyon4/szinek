import express from 'express';
import cors from 'cors';



const app = express();
app.use(express.json());
app.use(cors());

const szinek = [
    { id: 1, nev: 'fekete', kod:"#000000" },
    { id: 2, nev: 'fehér',  kod:"#FFFFFF" }
]
let nextId = 3;

function addSzin(req, resp){
    if(req.body.nev && req.body.kod){
        let szin = { id: nextId, nev: req.body.nev, kod: req.body.kod };
        nextId++;
        szinek.push(szin)
        resp.status(200).send(szin);
    }
    else { resp.status(400).send({error: 'Hibás paraméterek'}) }
}

function putSzin(req, resp){
    if(req.params.id && req.body.nev && req.body.kod ){
        let i = indexOf(req.params.id);
        if(i!=-1){
            let szin = { id: req.params.id, nev: req.body.nev, kod: req.body.kod };
            nextId++;
            szinek[i] = szin;
            resp.status(200).send(szin);
        }
    }else { resp.status(400).send({error: 'Hibás paraméterek'}) }
}

function delSzin(req, resp){
    if(req.params.id){
        let i = indexOf(req.params.id);
        if(i!=-1){
            szinek.splice(i, 1)
            resp.status(200).send(szinek[0]);
        } else resp.status(404).send({error:'hibás id'})
    } else resp.status(404).send({error:'nem létező id'})
}

function indexOf(id){
    let i = 0; while(i<szinek.length && szinek[i].id != id) i++;
    if(i<szinek.length) return i; else return -1;
}

app.get('/', (req, resp) => resp.send('<h1>Színek v1.0.0</h1>'))
app.get('/szinek', (req, resp) => resp.send(szinek))
app.post('/szin', addSzin)
app.put('/szin/:id', putSzin)
app.delete('/szin/:id', delSzin)

app.listen(88, (error) => {
    if(error) console.log(error);
    else console.log('Server on 88 port');
}) 