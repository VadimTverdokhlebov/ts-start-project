import User from '../models/User.js';

export function createUser(userData) {
    return User.create(userData);
}

export function getUsers() {
    // return user.find({ _id: { $in: userId } });
    return User.find().all('users', []);
}

export function checkUser(email) {
    return User.findOne({ email });
}

export function updateUserData(email, userData) {
    return User.updateOne({ email: email }, { $set: userData });
}

export function getUser(userId) {
    return User.findOne({ userId });
}
