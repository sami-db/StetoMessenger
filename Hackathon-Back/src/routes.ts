import { Router } from "express";
import db from "./database/database";

/**
 * Creates an instance of the Router.
 */
const router = Router();

/**
 * Defines the routes for the API.
 */
router.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

/**
 * Gets a list of patients.
 * @param req - The request object.
 * @param res - The response object.
 */
router.get("/api/getPatients", async (req, res) => {
  try {
    // Establishes a connection
    const connection = await db();

    // Executes the query
    const [users] = await connection.query(
      "SELECT patient.id, patient.firstname, patient.lastname, patient.email, careteam.id as careteamId FROM patient JOIN careteam ON patient.id = careteam.subjectId"
    );

    // Closes the connection
    await connection.end();

    // Sends the response
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users" });
  }
});

/**
 * Gets a list of doctors.
 * @param req - The request object.
 * @param res - The response object.
 */
router.get("/api/getDoctors", async (req, res) => {
  try {
    // Establishes a connection
    const connection = await db();

    // Executes the query
    const [users] = await connection.query(
      "SELECT DISTINCT practitioner.id, practitioner.firstname, practitioner.lastname FROM `practitioner` join careteamparticipant on practitioner.id = careteamparticipant.memberId where role = 'doctor'"
    );

    // Closes the connection
    await connection.end();

    // Sends the response
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users" });
  }
});

/**
 * Gets a list of nurses.
 * @param req - The request object.
 * @param res - The response object.
 */
router.get("/api/getNurses", async (req, res) => {
  try {
    // Establishes a connection
    const connection = await db();

    // Executes the query
    const [users] = await connection.query(
      "SELECT DISTINCT practitioner.id, practitioner.firstname, practitioner.lastname FROM `practitioner` join careteamparticipant on practitioner.id = careteamparticipant.memberId where role = 'nurse'"
    );

    // Closes the connection
    await connection.end();

    // Sends the response
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users" });
  }
});

/**
 * Sends a message.
 * @param req - The request object.
 * @param res - The response object.
 */

router.post("/api/sendMessage", async (req, res) => {
  try {
    // Retrieves the message data from the request body
    const { senderId, messageContent, careTeamId } = req.body;

    if (!senderId || !messageContent || !careTeamId) {
      return res
        .status(400)
        .json({ message: "Missing data to send the message" });
    }

    // Establishes a connection
    const connection = await db();

    // Prepares and executes the query
    const sql =
    "INSERT INTO message (senderId, careTeamId, content, createdAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP)";

    await connection.query(sql, [senderId, careTeamId, messageContent]);

    // Closes the connection
    await connection.end();

    // Sends the response
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Error sending message" });
  }
});


router.post("/api/sendMessage/:type", async (req, res) => {
  try {
    // Retrieves the message data from the request body
    const { senderId, messageContent, careTeamId } = req.body;

    if (!senderId || !messageContent || !careTeamId || !req.params.type) {
      return res
        .status(400)
        .json({ message: "Missing data to send the message" });
    }

    // Establishes a connection
    const connection = await db();

    // Prepares and executes the query
    const sql =
    "INSERT INTO message (senderId, careTeamId, content, createdAt, messageType) VALUES (?, ?, ?, CURRENT_TIMESTAMP, '"+ [req.params.type] +"')";

    await connection.query(sql, [senderId, careTeamId, messageContent]);

    // Closes the connection
    await connection.end();

    // Sends the response
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Error sending message" });
  }
});

/**
 * Gets messages for a given care team ID.
 * @param req - The request object.
 * @param res - The response object.
 */
router.get("/api/getMessageByPatientId/:id", async (req, res) => {

  try {
    // Establishes a connection
    const connection = await db();

    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: "Missing data to send the message" });
    }

    // Executes the query
    const [messages] = await connection.query(
      "SELECT m.content AS message_content, m.createdAt AS message_date, COALESCE(CONCAT(pr.firstname, ' ', pr.lastname), CONCAT(p.firstname, ' ', p.lastname)) AS sender_name, m.id, m.messageType FROM message m JOIN careteam c ON m.careTeamId = c.id LEFT JOIN practitioner pr ON m.senderId = pr.id LEFT JOIN patient p ON m.senderId = p.id WHERE c.subjectId = "+ [req.params.id] +" and messageType = 'group' ORDER BY m.createdAt ASC" );
      
      // Closes the connection
    await connection.end();

    // Sends the response
    res.json(messages);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users" });
  }
});


router.get("/api/getAllMessageByPractitionerId/:id/:idPat", async (req, res) => {

  // console.log(req.params.idPat)
  try {
    // Establishes a connection
    const connection = await db();

    if (!req.params.id || !req.params.idPat) {
      return res
        .status(400)
        .json({ message: "Missing data to send the message" });
    }

    // Executes the query
    const [messages] = await connection.query(
      "SELECT m.content AS message_content, m.createdAt AS message_date, COALESCE(CONCAT(pr.firstname, ' ', pr.lastname), CONCAT(p.firstname, ' ', p.lastname)) AS sender_name, m.id FROM message m JOIN careteam c ON m.careTeamId = c.id JOIN careteamparticipant cp ON c.id = cp.careTeamId LEFT JOIN patient p ON m.senderId = p.id LEFT JOIN practitioner pr ON m.senderId = pr.id WHERE cp.memberId = " + [req.params.id] + " AND c.subjectId = "+ [req.params.idPat] +" ORDER BY m.createdAt ASC ");
      // Closes the connection
    await connection.end();

    // Sends the response
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res
      .status(500)
      .json({ message: "Error fetching messages" });
  }
});



router.get("/api/getProMessageByPractitionerId/:id/:idPat", async (req, res) => {

  try {
    // Establishes a connection
    const connection = await db();

    if (!req.params.id || !req.params.idPat) {
      return res
        .status(400)
        .json({ message: "Missing data to send the message" });
    }

    // Executes the query
    const [messages] = await connection.query(
      "SELECT m.content AS message_content, m.createdAt AS message_date, COALESCE(CONCAT(pr.firstname, ' ', pr.lastname), CONCAT(p.firstname, ' ', p.lastname)) AS sender_name, m.id FROM message m JOIN careteam c ON m.careTeamId = c.id JOIN careteamparticipant cp ON c.id = cp.careTeamId LEFT JOIN patient p ON m.senderId = p.id LEFT JOIN practitioner pr ON m.senderId = pr.id WHERE cp.memberId = " + [req.params.id] + " AND c.subjectId = "+ [req.params.idPat] +" AND m.messageType = 'Pro' ORDER BY m.createdAt ASC ");
  
      // Closes the connection
    await connection.end();

    // Sends the response
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res
      .status(500)
      .json({ message: "Error fetching messages" });
  }
});


/**
 * Gets non-pro messages for a given care team ID.
 * @param req - The request object.
 * @param res - The response object.
 */
router.post("/api/getNotProMessageByCareTeamId", async (req, res) => {
  try {
    // Retrieves the message data from the request body
    const { careTeamId } = req.body;

    if (!careTeamId) {
      return res
        .status(400)
        .json({ message: "Missing data to send the message" });
    }

    // Establishes a connection
    const connection = await db();

    // Prepares and executes the query
    // const sql = "INSERT INTO message (senderId, content) VALUES (?, ?)";
    const sql =
      "SELECT * FROM MESSAGE Where careTeamId = ? and messageType = 'group'";

    await connection.query(sql, [careTeamId]);

    // Closes the connection
    await connection.end();

    // Sends the response
    res.status(200).json({ message: "Message retrieved successfully" });
  } catch (error) {
    console.error("Error retrieving message:", error);
    res
      .status(500)
      .json({ message: "Error retrieving message" });
  }
});

/**
 * Gets patients for a given practitioner ID.
 * @param req - The request object.
 * @param res - The response object.
 */
router.get("/api/getPatientByProId/:id", async (req, res) => {
  try {
    // Retrieves the message data from the request body

    const connection = await db();

    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: "Missing data to send the message" });
    }

    // Establishes a connection
    

    // Prepares and executes the query
    const [messages] = await connection.query(
      "select patient.id, patient.firstname, patient.lastname, patient.email, careteam.id as careteamid from practitioner join careteamparticipant on practitioner.id = careteamparticipant.memberid join careteam on careteamparticipant.careteamid = careteam.id join patient on careteam.subjectid = patient.id where practitioner.id = " + req.params.id);
    // await connection.query(sql, [proId]);

    // Closes the connection
    await connection.end();

    // Sends the response
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error retrieving patients:", error);
    res
      .status(500)
      .json({ message: "Error retrieving patients" });
  }
});

export default router;