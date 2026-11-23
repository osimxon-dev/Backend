const jwt = require("jsonwebtoken");
const { User } = require("../model/userSchema");
const bcrypt = require("bcrypt")

const postRegister = async (req, res) => {
  try {
    const {
      username,
      password,
      firstname,
      lastname,
      birthday,
      jinsi,
      address,
      phone,
    } = req.body;
    const existingUser = await User.findOne({ username });

    console.log(existingUser);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Bu nom bilan ro'yxatga o'tgan foydalanuvchimavjud.",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({
        username,
        firstname,
        lastname,
        birthday,
        jinsi,
        address,
        phone,
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(201).json({
        success: true,
        message: "Ro'yxatga o'tish muvaffaqiyatli yakunlandi.",
      });
    }
  } catch (error) {
    console.log("Xato", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Ro'yxatga o'tish jarayonida xatolik yuz berdi",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      message: "Barcha foydalanuvchilar ro'yxati olingan.",
      innerData: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Foydalanuvchilarni olishda xatolik yuz berdi",
    });
  }
};
const getUsersBydId = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User found", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully",deleteUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { username, password, firstname, lastname, phone, address } = req.body

    const updatedUser = await User.findByIdAndUpdate(
      id, 
      { username, password, firstname, lastname, phone, address },
      { new: true }
    )

    if(!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      })
    }

    res.json({
      success: true,
      message: "User updated successfully!",
      user: updatedUser,
    })
  }catch (error) {
    res.status(500).json({
      success: false, 
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

const searchUser = async (req, res) => {
  try {
    const { query } = req.query

    if(!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query" })
    }

    const result = await User.find({
      $or: [
        { firstname: { $regex: query, $options: "i" } },
        { lastname: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
    })

    if(result.length === 0) {
      return res.json({ message: "Bunday foydalanuvchi topilmadi" })
    }

    res.json(result)
  }catch (error) {
    console.error("Error fetching users:" , error)
  }
}

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    console.log(user)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Username is invalid"
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Username or password is invalid"
      })
    }

    const token = jwt.sign({ username: user.username }, "secret")
    return res.json({
      message: "Token",
      token: token,
    })
  }catch (error) {
    console.error("Error:", error)
    return res.status(500).json({
      success: false,
      message: "Server error: An error occured during the login proccess"
    })
  }
}



module.exports = {
  postRegister,
  getUsers,
  getUsersBydId,
  deleteUser,
  updateUser,
  searchUser,
  postLogin,
};
