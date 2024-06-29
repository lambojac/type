// server.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { User } from './interface';

const app = express();
const port = 3000;

app.use(bodyParser.json());

let users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', age: 25 },
];

// CRUD operations
app.get('/users', (req: Request, res: Response) => {
    res.json(users);
});

app.get('/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

app.post('/users', (req: Request, res: Response) => {
    const newUser: User = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updateUser: User = req.body;
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updateUser };
        res.json(users[index]);
    } else {
        res.status(404).send('User not found');
    }
});

app.delete('/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    users = users.filter(user => user.id !== id);
    res.json({ message: 'User deleted successfully' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
