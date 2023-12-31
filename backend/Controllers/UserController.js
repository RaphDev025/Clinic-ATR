const User = require('../Models/UserModel')
const mongoose = require('mongoose')

// get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

const countNewUsersInCurrentMonth = async (req, res) => {
    try {
        // Get the current date
        const currentDate = new Date();

        // Get the first day of the current month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Get the last day of the current month
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Query to count new users registered in the current month
        const totalNewUsers = await User.countDocuments({
            createdAt: {
                $gte: firstDayOfMonth,
                $lte: lastDayOfMonth,
            },
        });

        res.status(200).json({ totalNewUsers });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// API function to count total documents in the User collection
const countUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        res.status(200).json({ totalUsers });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// get single user
const getUserById = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No User Found'})
    }
    const user = await User.findById(id)

    if(!user){
        return res.status(404).json({error: 'No User Found'})
    }
    res.status(200).json(user)
}

const getUserByUsername = async (req, res) => {
    const { user_name } = req.params;
    try {
      // Find the user with the provided user_name
        const user = await User.findOne({ user_name });
    
        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
      // Return the user data
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// create user
const createUser = async (req, res) => {
    const {first_name, last_name, user_name, email, password, gender, user_type, address, profile, phone} = req.body
    try{
        const user = await User.create({first_name, last_name, user_name, email, password, gender, user_type, address, profile, phone})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// delete user
const deleteUser = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No User Found'})
    }
    const user = await User.findOneAndDelete({_id: id})

    if(!user){
        return res.status(404).json({error: 'No User Found'})
    }
    res.status(200).json(user)
}

// update user
const updateUser = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No User Found'})
    }
    const user = await User.findByIdAndUpdate({_id: id}, {
        ...req.body
    })
    if(!user){
        return res.status(404).json({error: 'No User Found'})
    }
    res.status(200).json(user)
}

const updateUserPassword = async (req, res) => {
    const { user_name } = req.params;
    try {
      // Check if user with the provided user_name exists
        const user = await User.findOne({ user_name });
    
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user)
        // Update the password
        user.password = req.body.newPassword; // Assuming your user model has a 'password' field
        // Save the updated user to the database
        await user.save();
    
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getUserByUsername,
    updateUserPassword,
    getUsers, 
    getUserById,
    countUsers,
    countNewUsersInCurrentMonth,
    createUser,
    deleteUser,
    updateUser
}