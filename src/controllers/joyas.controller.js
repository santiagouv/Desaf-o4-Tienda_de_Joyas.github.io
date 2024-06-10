const joyasModel = require('../models/joyas.model')

const formatHATEOAS = (data) => {

  const results = data.map(item => {
    return {
      name: item.nombre,
      href: `/joyas/joya/${item.id}`
    }
  })

  const total = results.length
  const stock = data.reduce((stock, item) => stock += item.stock, 0)

  return {
    totalJoyas: total,
    stockTotal: stock,
    results
  }
}

const getJoyasController = async (req, res) => {
  try {

    const queryStrings = req.query
    const joyas = await joyasModel.getJoyas(queryStrings)

    const results = formatHATEOAS(joyas)
    res.json(results)

  } catch (error) {

    console.log(error)
    res.status(500).json({msg: "Internal server error"})

  }
}

const getJoyasByFilterController = async (req, res) => {
  try {

    const queryStrings = req.query
    const joyas = await joyasModel.filterJoyas(queryStrings)

    const results = formatHATEOAS(joyas)
    res.json(results)

  } catch (error) {

    console.log(error)
    res.status(500).json({msg: "Internal server error"})

  }
}

module.exports = {
  getJoyasController,
  getJoyasByFilterController
}