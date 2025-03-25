module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      image: {
        type: DataTypes.TEXT,
      },
    });
  
    return Comment;
  };
  