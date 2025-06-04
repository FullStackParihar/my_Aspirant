const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.secretKey || 'asdfghjkl';
const otpStore = new Map();

 
const generateToken = (user) => {
  return jwt.sign({ _id: user._id, email: user.email, role: user.role }, secretKey, {
    expiresIn: '7d',
  });
};

 
exports.signup = async (req, res) => {
  const { name, email, phone, password ,gender} = req.body;
  console.log('signup body',req.body)
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'Email already registered' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore.set(email, {
    otp,
    expires: Date.now() + 10 * 60 * 1000,
    userData: { name, email, phone, password: hashedPassword, role: 'user',gender },
  });

  console.log('OTP:', otp);  
  res.json({ message: 'OTP sent to your email' });
};

 
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log('verifyotp body',req.body)
  const stored = otpStore.get(email);

  if (!stored || stored.otp !== otp || Date.now() > stored.expires) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  const user = new User(stored.userData);
  await user.save();
  otpStore.delete(email);

  const token = generateToken(user);
  res.json({
    token,
    user: { _id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

 
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user);
  res.json({
    token,
    user: { _id: user._id, name: user.name, email: user.email, role: user.role },
  });
};
 
exports.getusers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
 
exports.getuserprofile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, gender, age } = req.body;

  const user = await User.findByIdAndUpdate(id, {
    name,
    email,
    phone,
    gender,
    age
  }, { new: true });

  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User updated successfully', user });
};