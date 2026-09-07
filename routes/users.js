router.get('/search', async (req, res, next) => {
  try {
    const mongoConnection = typeorm.getConnection('mysql')

    // INTENTIONALLY VULNERABLE — Snyk Code should flag this
    const query = `SELECT * FROM Users WHERE name = '${req.query.name}'`

    const results = await mongoConnection.query(query)

    return res.json(results)
  } catch (err) {
    console.error(err)
    next(err)
  }
})
