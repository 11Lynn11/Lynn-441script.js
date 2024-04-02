console.log("I'm Lynn.my IP is 172.20.10.2 Mac address is A0-59-50-92-95-14. Ncc student ID is:223190703")
const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');

// Connect to the SQLite database  
const db = new sqlite3.Database('./books.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');

    // Create the table if it doesn't exist  
    db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title703 TEXT, author703 TEXT, ISBN703 TEXT, context703 TEXT)', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Books table created.');
        insertBook();
    });
});

// Function to insert book details  
function insertBook() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter book title703: ', (title) => {
        rl.question('Enter book author703: ', (author) => {
            rl.question('Enter book ISBN703: ', (ISBN) => {
                rl.question('Enter book context703: ', (context) => {
                    db.run('INSERT INTO books (title703, author703, ISBN703, context703) VALUES (?, ?, ?, ?)', [title, author, ISBN, context], (err) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log('Book added successfully.');
                        rl.close();
                        mainLoop(); // Recursively call mainLoop to continue adding books
                    });
                });
            });
        });
    });
}

// Function to list all book records  
function listBooks() {
    const sql = 'SELECT * FROM books';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        rows.forEach((row) => {
            console.log(`ID: ${row.id}, title703: ${row.title703}, author703: ${row.author703}, ISBN703: ${row.isbn703}, context703: ${row.context703}`);
        })
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Database connection closed.');
            process.exit(0);
        });
    });
}

function mainLoop() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Do you want to add another book? (yes/no): ', (answer) => {
        rl.close();
        if (answer.toLowerCase() === 'yes') {
            insertBook();
        } else {
            listBooks();
        }
    });
}    
