import jwt from 'jsonwebtoken';


export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    // JWT_SECRET encrypts user credentials
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};