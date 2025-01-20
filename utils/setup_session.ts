import session from "express-session";

const setupSession = (store: any) => {
  return session({
    store,
    secret: "your-secret-key", // Секретный ключ для подписи cookie
    resave: false, // Пересохранять сессию, даже если она не изменилась
    saveUninitialized: false, // Сохранять новую сессию, даже если она пуста
    cookie: {
      maxAge: 60000, // Время жизни cookie (в миллисекундах)
      signed: true, // Подписывать cookie
    },
  });
};

export default setupSession;
