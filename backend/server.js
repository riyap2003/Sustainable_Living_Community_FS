const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "SUSTAINABLE_LIVING_COMMUNITY"
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Error inserting data into database" });
        }
        return res.json({ success: true, message: "Data inserted successfully" });
    });
});


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email`= ? AND `password`= ?";
    const values = [req.body.email, req.body.password]; // Define values for placeholder substitution

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error querying data:", err);
            return res.status(500).json({ error: "Error querying data from database" });
        }

        if (data.length > 0) {
            return res.json({ success: true, message: "Login successful" });
        } else {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
    });
});

// Route handler for handling POST requests to /main1
app.post('/main1', (req, res) => {

    const { communityName, foundingDate, location } = req.body;
    const sql = "INSERT INTO COMMUNITY (COMMUNITY_NAME, FOUNDING_DATE, LOCATION) VALUES (?, ?, ?)";
    const values = [communityName, foundingDate, location];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Error inserting data into database" });
        }
        return res.json({ success: true, message: "Community data inserted successfully" });
    });
});

// Route handler for fetching details of communities
app.get('/main1', (req, res) => {
    const sql = "SELECT * FROM COMMUNITY";

db.query(sql, (err, data) => {
    if (err) {
        console.error("Error querying data:", err);
        return res.status(500).json({ error: "Error querying data from database" });
    }

    // Map over the data to modify the FOUNDING_DATE format
    const modifiedData = data.map(community => {
        // Parse the date string into a Date object
        const foundingDate = new Date(community.FOUNDING_DATE);

        // Extract day, month, and year components
        const day = String(foundingDate.getUTCDate()).padStart(2, '0');
        const month = String(foundingDate.getUTCMonth() + 1).padStart(2, '0'); // Month is zero-based
        const year = foundingDate.getUTCFullYear().toString().slice(-2); // Extract the last two digits of the year

        // Formatted date string in dd-mm-yy format
        const formattedDate = `${day}-${month}-${year}`;

        // Return the community object with the formatted date
        return {
            ...community,
            FOUNDING_DATE: formattedDate
        };
    });

    // Send the modified data as JSON response
    return res.json(modifiedData);
});


app.delete('/main1/:communityId', (req, res) => {
    const communityId = req.params.communityId;
    const deleteMemberQuery = `
        DELETE FROM COMMUNITY
        WHERE COMMUNITY_ID = ?;
    `;

    db.query(deleteMemberQuery, [communityId], (err, result) => {
        if (err) {
            console.error('Error deleting member:', err);
            return res.status(500).json({ error: 'Error deleting member' });
        }

        if (result.affectedRows > 0) {
            // Member deleted successfully
            res.json({ success: true, message: 'Member deleted successfully' });
        } else {
            // Member with the specified ID not found
            res.status(404).json({ success: false, message: 'Member not found' });
        }
    });
});
});


//feedback  of the website
app.post('/home', (req, res) => {
    const { name, email, subject, message } = req.body;
    const sql = "INSERT INTO HOME_FEEDBACK (name, email, subject, message) VALUES (?, ?, ?, ?)";
    const values = [name, email, subject, message];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Error inserting data into database" });
        }
        return res.json({ success: true, message: "Feedback data inserted successfully" });
    });
});




app.post('/main2/:communityId', (req, res) => {
    const { fname, lname, join_date, address, phone_no } = req.body;
    const communityId = req.params.communityId;

    const insertMemberQuery = `INSERT INTO COMMUNITY_MEMBER (FNAME, LNAME, JOIN_DATE, ADDRESS, COMMUNITY_ID) VALUES (?, ?, ?, ?, ?)`;
    const insertPhoneQuery = `INSERT INTO MEMBER_PHONE (MEMBER_ID, PHONE_NO) VALUES (?, ?)`;

    db.beginTransaction(err => {
        if (err) {
            console.error('Error beginning transaction:', err);
            return res.status(500).json({ error: "Error beginning transaction" });
        }

        db.query(insertMemberQuery, [fname, lname, join_date, address, communityId], (err, memberResult) => {
            if (err) {
                db.rollback(() => {
                    console.error('Error inserting member data:', err);
                    return res.status(500).json({ error: "Error inserting member data" });
                });
            }

            const memberId = memberResult.insertId;

            db.query(insertPhoneQuery, [memberId, phone_no], (err, phoneResult) => {
                if (err) {
                    db.rollback(() => {
                        console.error('Error inserting phone data:', err);
                        return res.status(500).json({ error: "Error inserting phone data" });
                    });
                }

                db.commit(err => {
                    if (err) {
                        db.rollback(() => {
                            console.error('Error committing transaction:', err);
                            return res.status(500).json({ error: "Error committing transaction" });
                        });
                    }
                    console.log('Transaction Completed Successfully!');
                    res.send('Data Inserted Successfully');
                });
            });
        });
    });
});



app.get('/main2/:communityId', (req, res) => {
    const communityId = req.params.communityId;
    const selectMembersQuery = `
        SELECT 
            MEMBER_ID,CONCAT(FNAME, ' ', LNAME) AS full_name, 
            ADDRESS, 
            DATE_FORMAT(JOIN_DATE, '%d-%m-%y') AS formatted_join_date
        FROM 
            COMMUNITY_MEMBER
        WHERE
            COMMUNITY_ID = ?;
    `;

    db.query(selectMembersQuery, [communityId], (err, results) => {
        if (err) {
            console.error('Error fetching community members:', err);
            return res.status(500).json({ error: 'Error fetching community members' });
        }

        res.json(results);
    });
});

app.delete('/main2/:communityId/:memberId', (req, res) => {
    const communityId = req.params.communityId;
    const memberId = req.params.memberId;

    const deleteMemberQuery = `
        DELETE FROM COMMUNITY_MEMBER 
        WHERE COMMUNITY_ID = ? AND MEMBER_ID = ?;
    `;

    db.query(deleteMemberQuery, [communityId, memberId], (err, result) => {
        if (err) {
            console.error('Error deleting member:', err);
            return res.status(500).json({ error: 'Error deleting member' });
        }

        if (result.affectedRows > 0) {
            // Member deleted successfully
            res.json({ success: true, message: 'Member deleted successfully' });
        } else {
            // Member with the specified ID not found
            res.status(404).json({ success: false, message: 'Member not found' });
        }
    });
});
app.get('/main2/:communityId/:memberId', (req, res) => {
    const { communityId, memberId } = req.params;
    const sql = `
        SELECT cm.*, mp.phone_no, DATE_FORMAT(cm.join_date, '%d-%m-%y') AS formatted_join_date
        FROM COMMUNITY_MEMBER cm
        LEFT JOIN MEMBER_PHONE mp ON cm.MEMBER_ID = mp.MEMBER_ID
        WHERE cm.MEMBER_ID = ? AND cm.COMMUNITY_ID = ?
    `;
    const values = [memberId, communityId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error fetching member details:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    });
});

// Update member details
app.put('/main2/:communityId/:memberId', (req, res) => {
    const { communityId, memberId } = req.params;
    const updatedMemberData = req.body;

    const sql = `
    UPDATE COMMUNITY_MEMBER AS cm
    JOIN MEMBER_PHONE AS mp ON cm.MEMBER_ID = mp.MEMBER_ID
    SET cm.fname = ?, cm.lname = ?, cm.join_date = ?, cm.address = ?, mp.phone_no = ?
    WHERE cm.MEMBER_ID = ? AND cm.COMMUNITY_ID = ?;
    
    `;
    const values = [
        updatedMemberData.fname,
        updatedMemberData.lname,
        updatedMemberData.join_date,
        updatedMemberData.address,
        updatedMemberData.phone_no,
        memberId,
        communityId,
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating member:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Member updated successfully' });
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    });
});





// Route handler for handling POST requests to /sustainable_initiatives
app.post('/main4', (req, res) => {
    const { sustainablePractice, budget, goals } = req.body;
    const sql = "INSERT INTO SUSTAINABLE_INITIATIVES (SUSTAINABLE_PRACTICE, BUDGET, GOALS) VALUES (?, ?, ?)";
    const values = [sustainablePractice, budget, goals];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Error inserting data into database" });
        }
        return res.json({ success: true, message: "Sustainable initiative data inserted successfully" });
    });
});

// Route handler for fetching details of sustainable initiatives
app.get('/main4', (req, res) => {
    const sql = "SELECT * FROM SUSTAINABLE_INITIATIVES";

    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error querying data:", err);
            return res.status(500).json({ error: "Error querying data from database" });
        }
        return res.json(data);
    });
});

// Route handler for fetching member details for all community IDs
app.get('/members/all', (req, res) => {
    const selectMembersQuery = `
        SELECT MEMBER_ID, CONCAT(FNAME, ' ', LNAME) AS full_name, COMMUNITY_ID
        FROM COMMUNITY_MEMBER`;

    db.query(selectMembersQuery, (err, result) => {
        if (err) {
            console.error('Error fetching member details:', err);
            return res.status(500).json({ error: "Error fetching member details" });
        }

        res.json(result);
    });
});


// Route handler for fetching sustainable initiatives
app.get('/main4/initiatives', (req, res) => {
    const selectInitiativesQuery = "SELECT S_ID, SUSTAINABLE_PRACTICE, BUDGET, GOALS FROM SUSTAINABLE_INITIATIVES";

    db.query(selectInitiativesQuery, (err, data) => {
        if (err) {
            console.error("Error querying sustainable initiatives:", err);
            return res.status(500).json({ error: "Error querying sustainable initiatives from database" });
        }
        return res.json(data);
    });
});

// Route handler for adding member sustainable initiatives
app.post('/main5', (req, res) => {
    const { memberId, initiativeId } = req.body;

    // Validate input data
    if (!memberId || !initiativeId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // SQL query to insert data into MEMBER_SUSTAINABLE_INITIATIVES table
    const insertMemberInitiativeQuery = "INSERT INTO MEMBER_SUSTAINABLE_INITIATIVES (MEMBER_ID, S_ID) VALUES (?, ?)";
    const values = [memberId, initiativeId];

    // Execute the query
    db.query(insertMemberInitiativeQuery, values, (err, data) => {
        if (err) {
            console.error("Error adding member sustainable initiative:", err);
            return res.status(500).json({ error: "Error adding member sustainable initiative into database" });
        }

        // Data inserted successfully
        return res.json({ success: true, message: "Member sustainable initiative added successfully" });
    });
});


//display the view 

// Route handler for fetching member sustainable initiatives
app.get('/member_sustainable_initiatives', (req, res) => {
    const sql = `
        SELECT *
        FROM
            MemberSustainableInitiativeView
    `;

    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error querying data:", err);
            return res.status(500).json({ error: "Error querying data from database" });
        }
        return res.json(data);
    });
});




// Route handler for adding events
app.post('/main6', (req, res) => {
    const { eventName, eventDate, eventTheme, communityId, status } = req.body;
    const insertEventQuery = "INSERT INTO EVENT (E_NAME, DATE, THEME, COMMUNITY_ID, STATUS) VALUES (?, ?, ?, ?, ?)";
    const values = [eventName, eventDate, eventTheme, communityId, status || 'Pending'];

    db.query(insertEventQuery, values, (err, data) => {
        if (err) {
            console.error("Error adding event:", err);
            return res.status(500).json({ error: "Error adding event into database" });
        }
        const eventId = eventResult.insertId;

        // Insert participants
        if (participants && participants.length > 0) {
            const participantValues = participants.map(name => [eventId, name]);
            const insertParticipantQuery = "INSERT INTO PARTICIPANTS (EVENT_ID, P_NAME) VALUES ?";
            db.query(insertParticipantQuery, [participantValues], (err) => {
                if (err) {
                    console.error("Error adding participants:", err);
                    return res.status(500).json({ error: "Error adding participants into database" });
                }
                return res.json({ success: true, message: "Event and participants added successfully" });
            });
        } else {

        return res.json({ success: true, message: "Event added successfully" });
    }
    });
});


app.get('/events/all', (req, res) => {
    const sql = 'SELECT * FROM event';
  
    db.query(sql, (err, data) => {
      if (err) {
        console.error('Error querying data:', err);
        return res.status(500).json({ error: 'Error querying data from database' });
      }
  
      // Send the events data as JSON response
      return res.json(data);
    });
  });


 // Assuming you have initialized your Express app and connected to your database

// POST route to handle participant submissions
app.post('/main8', (req, res) => {
    // Extract eventID and participantName from the request body
    const { eventID, participantName } = req.body;
  
    // Perform any necessary validation of the data
    if (!eventID || !participantName) {
      return res.status(400).json({ error: 'Event ID and participant name are required' });
    }
  
    // Assuming you have a 'participants' table in your database
    const sql = 'INSERT INTO participants (EVENT_ID, P_NAME) VALUES (?, ?)';
  
    // Execute the SQL query to insert the participant data into the database
    db.query(sql, [eventID, participantName], (err, result) => {
      if (err) {
        console.error('Error inserting participant:', err);
        return res.status(500).json({ error: 'Error inserting participant into the database' });
      }
  
      // Participant inserted successfully
      return res.status(201).json({ message: 'Participant added successfully' });
    });
  });
  
  app.post('/main7', (req, res) => {
    const { COMMUNITY_ID, RATING, DESCRIPTIONS } = req.body;

    // Validate that COMMUNITY_ID is a non-empty string or a valid integer
    if (typeof COMMUNITY_ID !== 'string' || !COMMUNITY_ID.trim()) {
        return res.status(400).json({ error: 'Invalid COMMUNITY_ID' });
    }

    const feedback = {
        COMMUNITY_ID,
        RATING,
        DESCRIPTIONS
    };

    const sql = 'INSERT INTO FEEDBACK SET ?';

    db.query(sql, feedback, (err, result) => {
        if (err) {
            console.error('Error inserting feedback:', err);
            return res.status(500).json({ error: 'Error inserting feedback into database' });
        }
        console.log('Feedback inserted successfully');
        res.status(200).json({ message: 'Feedback inserted successfully' });
    });
});

// Route handler for updating event status
app.put('/main8/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    const newStatus = req.body.newStatus;

    // Validate input data
    if (!eventId || !newStatus) {
        return res.status(400).json({ error: 'Event ID and new status are required' });
    }

    // Assuming you have an 'events' table in your database
    const sql = 'UPDATE event SET STATUS = ? WHERE EVENT_ID = ?';

    // Execute the SQL query to update the event status in the database
    db.query(sql, [newStatus, eventId], (err, result) => {
        if (err) {
            console.error('Error updating event status:', err);
            return res.status(500).json({ error: 'Error updating event status in the database' });
        }

        // Event status updated successfully
        return res.status(200).json({ message: 'Event status updated successfully' });
    });
});


app.post('/get-sustainable-initiatives', (req, res) => {
    const { minBudget, maxBudget } = req.body;
  
    const sql = 'CALL GetSustainableInitiativesByBudgetRange(?, ?)';
    const values = [minBudget, maxBudget];
  
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error('Error fetching sustainable initiatives:', err);
        return res.status(500).json({ error: 'Error fetching sustainable initiatives from database' });
      }
      return res.json(data);
    });
  });








app.listen(8081, () => {
    console.log("Server listening on port 8081");
});
