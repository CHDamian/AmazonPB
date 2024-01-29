const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');



app.use(cors());
app.use(express.json());


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const help = readUsersFile();
    const user = help.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, message: "Zalogowano", user: user });
    } else {
        res.status(401).json({ success: false, message: "Ni działa" })
    }
});

app.post('/register', (req, res) => {
    const { username, password, address, email } = req.body;
    const help = readUsersFile();
    const user = help.find(u => u.username === username);
    if (!user) {
        help.push({ username, password, address, email });
        if (writeUsersFile(help)) {
            res.json({ success: true, message: "Zarejestrowano" })
        } else {
            res.status(500).json({ success: false, message: "Ni działa" })
        }
    } else {
        res.status(409).json({ success: false, message: "Ni działa" })
    }
});


app.post('/updateProfile', (req, res) => {
    const { username, oldPassword, newPassword, newAddress, newEmail } = req.body;
    const users = readUsersFile();
    const userIndex = users.findIndex(u => u.username === username);

    if (userIndex === -1) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = users[userIndex];

    if (oldPassword && newPassword) {
        if (user.password !== oldPassword) {
            return res.status(400).json({ success: false, message: "Invalid old password" });
        }
        user.password = newPassword;
    }

    if (newAddress) user.address = newAddress;
    if (newEmail) user.email = newEmail;

    if (writeUsersFile(users)) {
        res.json({ success: true, message: "Profile updated" });
    } else {
        res.status(500).json({ success: false, message: "Error updating profile" });
    }
});


app.listen(port, ()=>{
    console.log(`Serwer na porcie ${port}`)
})


function readUsersFile(){
    try{
        const data = fs.readFileSync("data.json", "utf8");
        return JSON.parse(data);
    } catch(error){
        console.error("Ni dziala", error);
        return [];
    }
}

function writeUsersFile(data)
{
    try{
        fs.writeFileSync("data.json", JSON.stringify(data),"utf8");
        return true;
    } catch(error){
        console.error("Ni dziala", error);
        return false;
    }
}