module.exports = {
	port: process.env.PORT || 8081,
	db: {
    database: process.env.DB_NAME || 'argus',
    user: process.env.DB_USER || 'argus',
    password: process.env.DB_PASS || 'argus',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost',
      timezone: '+05:30'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  },
  email: {
    user: "s.kumawat9907@gmail.com",
    password: "ILOVEMYMOM&DAD8982"
  }
}