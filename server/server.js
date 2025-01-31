const express = require('express');
const sequelize = require('./models/sequelize');
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const { Book, User, Booklog } = require('./models/model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import user model
const SECRETKEY = "keykey";
const moment = require('moment');
const app = express();
app.use(cors());
const PORT = 5001;
sequelize.sync();
app.use(express.json());

app.post('/register', async (req, res) => {
	const { username, email, phone, address, password, role } = req.body;

	// Check if user already exists
	const userExists = await User.findOne({ where: { email: email } });
	if (userExists) {
		return res.status(400).json({ msg: 'User already exists' });
	}

	let tokens = jwt.sign({ email }, SECRETKEY, { expiresIn: 86400 })

	// Hash the password
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		// Create a new user
		const newUser = await User.create({
			username: username,
			email: email,
			phone: phone,
			address: address,
			password: hashedPassword,
			role: role,
		});
		return res.send({ msg: 'User registered successfully', statuscode: 200, token: tokens }).status(201)
	} catch (error) {
		console.log({ msg: 'Error registering user', error });
		return res.status(500).json({ msg: 'Error registering user', error });
	}
});

// POST /login - Authenticate user
app.post('/login', async (req, res) => {
	const { email, password, role } = req.body;
	try {
		// Find user in MongoDB by email 
		const user = await User.findOne({ where: { email: email } });

		if (!user) {
			return res.status(400).json({ error: 'User not found' });
		}

		// Compare password with stored hash
		const isMatch = await bcrypt.compare(password, user.password);

		const username = await user.username;
		const userrole = await user.role;
		const userid = await user.id;

		if (!isMatch) {
			return res.status(400).json({ error: 'Invalid password' });
		}

		const userIdBook = await Booklog.findAll({ where: { UserId: user.id } })
		const bookname = await Book.findAll({ BookId: userIdBook.BookId })


		// Generate JWT token
		const token = jwt.sign({ email }, SECRETKEY, { expiresIn: 86400 })

		return res.send({ User: user, message: 'Login successful', statuscode: 200, token: token, usern: username, userid: userid, userRole: userrole, bookNames: bookname });

	} catch (err) {
		console.log(err);

		return res.status(500).json({ error: 'Server error' });
	}
});

app.get("/books", async (req, res) => {
	try {
		const books = await Book.findAll();

		//   await books.save();
		res.json(books);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch books" });
	}
})

app.post("/borrow/:id", async (req, res) => {
	const { id } = req.params; // Book ID
	const { userId } = req.body; // User ID from request body

	try {
		// Check if the user exists
		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Check if the book exists
		const book = await Book.findByPk(id);
		if (!book) {
			return res.status(404).json({ error: "Book not found" });
		}

		// Check if the book is available
		if (!book.isavailable || book.copies_available <= 0) {
			return res.status(400).json({ error: "Book not available" });
		}

		// Check if the user has an unreturned book
		const booklog = await Booklog.findAll({
			where: { UserId: userId, BookId: id, return_date: null },
		});

		if (booklog.length > 0) {
			return res
				.status(500)
				.json({ error: "You already borrowed this book and haven't returned it yet." });
		}

		const userBook = await Booklog.create({
			borrowed_date: moment().format(),
			UserId: userId,
			BookId: id,
		});

		// Decrement the available copies
		book.copies_available--;
		if (book.copies_available === 0) {
			book.isavailable = false;
		}

		await book.save();

		res.json({
			message: "Book borrowed successfully",
			bookName: book.bookName,
			userBook,
		});
	} catch (error) {
		console.error(error); // Log the error for debugging
		res.status(500).json({ error: "Failed to borrow book" });
	}
});

app.put('/rebook/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const BookId = req.body.bookId;
		const book = await Booklog.findOne({ where: { id: id } });
		if (!book) {
			return res.status(404).json({ message: 'Book not found' });
		}

		// const userfind = await Booklog.findOne({ where: { BookId: BookId } })

		await Book.increment('copies_available', { by: 1, where: { id: BookId } });

		await Book.update(
			{ isavailable: true },
			{
				where: {
					id: BookId,
				},
			},
		);

		await Booklog.update(
			{ return_date: moment().format() },
			{
				where: {
					id: id,
				},
			},
		);

		return res.json({ message: 'Successfully returned the book' });

	} catch (err) {
		console.error('Error while returning the book:', err);
		return res.status(500).json({ message: 'No books in your db' });
	}
});

app.get('/data/:userId', async (req, res) => {
	const { userId } = req.params;

	try {
		const booklog = await Booklog.findAll({ where: { UserId: userId } });
		const bookDetails = await Book.findAll({ attributes: ['id', 'bookName'] });
		const userDetails = await Booklog.findAll({
			where: { UserId: userId },
			attributes: ["id", "return_date", "borrowed_date", "createdAt", "BookId", "updatedAt"],
		});
		console.log("cdsv", userDetails);

		if (!booklog.length) {
			return res.status(404).json({ message: 'No books found in your db', statuscode: 404 });
		}

		return res.status(200).json({ message: 'data fetched successfully', statuscode: 200, book: userDetails, bookDetail: bookDetails });
	} catch (error) {
		console.error('Error fetching data:', error);
		return res.status(500).json({ error: 'Server error' });
	}
});

app.get('/carts/:userId', async (req, res) => {
	const { userId } = req.params;

	try {
		// Fetch user-books association
		const booklog = await Booklog.findAll({ where: { UserId: userId } });
		// const returnDate = await Booklog.findAll({ where: { UserId: userId } ,attributes:["return_date"]});
		// const barrowDate = await Booklog.findAll({ where: { UserId: userId } ,attributes:["borrowed_date"]});
		const bookDetails = await Book.findAll({ attributes: ['id', 'bookName'] });


		// Handle case where no books are found
		if (!booklog.length) {
			return res.status(200).json({ message: 'No books found in your db', statuscode: 200, cart: [] });
		}

		const userDetails = await Booklog.findAll({
			where: { UserId: userId },
			attributes: ["borrowed_date", "return_date", "createdAt", "BookId"],
		});

		return res.status(200).json({
			message: 'datas fetched successfully',
			statuscode: 200,
			book: userDetails,
			bookDetail: bookDetails
		});
	} catch (error) {
		console.error('Error fetching data:', error);
		return res.status(500).json({ message: 'Server error', error: error.message });
	}
});

app.get('/fetch', async (req, res) => {
	try {
		// Fetch all user-book associations
		const booklog = await Booklog.findAll();

		// Extract unique UserIds from Booklog
		const userIds = booklog.map((userBook) => userBook.UserId);
		const uniqueUserIds = [...new Set(userIds)]; // Remove duplicates

		// Fetch users based on the extracted UserIds
		const users = await User.findAll({
			where: { id: uniqueUserIds },
			attributes: ['id', 'username', 'address', 'phone'],
		});

		// Prepare a response object mapping userId to username
		const response = users.map((user) => ({
			userId: user.id,
			username: user.username,
			address: user.address,
			phone: user.phone,
		}));

		return res.json({ users: response });
	} catch (error) {
		console.error('Error in /fetch:', error);
		return res.status(500).json({ message: 'An error occurred while fetching data.' });
	}
});

app.use('/uploads', express.static('uploads'));
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
	}
})
const upload = multer({ storage });

app.post("/books", upload.single('file'), async (req, res) => {
	try {
		const { title, author, genre, copies_available } = req.body;

		const filePath = req.file ? `/uploads/${req.file.filename}` : null;

		// Save the book details to the database
		const newBook = await Book.create({
			bookName: title,
			author: author,
			genre: genre,
			copies_available: copies_available,
			images: filePath,
		});

		res.status(201).json({ message: "Book added successfully!", book: newBook, filePaths: filePath, });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to add the book." });
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});