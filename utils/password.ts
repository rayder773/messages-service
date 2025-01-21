const bcrypt = require("bcrypt");
const saltRounds = 10; // Уровень сложности хеширования

// Хеширование пароля
const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Ошибка хеширования пароля:", error);
  }
};

// Проверка пароля
const checkPassword = async (password: string, hashedPassword: string) => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Ошибка проверки пароля:", error);
  }
};

export { hashPassword, checkPassword };
