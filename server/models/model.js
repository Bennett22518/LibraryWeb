const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, required: true },
    email: { type: DataTypes.STRING, required: true, unique: true },
    phone : { type:DataTypes.STRING, required: true },
    address: { type: DataTypes.STRING, required:true},
    password: { type: DataTypes.STRING, required: true },
    role: { type: DataTypes.STRING, required:true }
},{
    timestamps : true
});

const Book = sequelize.define('Book',{
    bookName:{ type: DataTypes.STRING},
    author: { type:DataTypes.STRING},
    genre: {type:DataTypes.STRING},
    copies_available: {type:DataTypes.INTEGER},
    images: {type:DataTypes.STRING},
    isavailable: { type: DataTypes.BOOLEAN, defaultValue: true },
},{
    timestamps : true
})

const Booklog = sequelize.define('Booklog', {
    borrowed_date: DataTypes.DATE,
    return_date: DataTypes.DATE
});

User.hasMany(Booklog);

Book.hasMany(Booklog);

module.exports = {User,Book,Booklog};