const database = require('../database/config')
const format = require('pg-format')

const getJoyas = async ({limits = 6, order_by = 'id_ASC', page = 1}) => {
  const [campo, orden] = order_by.split("_")
  const offset = (page - 1) * limits

  const consulta = format(
    "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
    campo,
    orden,
    limits,
    offset
  )

  const {rows: joyas} = await database.query(consulta)
  return joyas
}

const filterJoyas = async ({precio_min, precio_max, categoria, metal}) => {
  let filtros = []
  const values = []

  const addFilter = (campo, comparador, valor) => {
    values.push(valor)
    const {length} = filtros
    filtros.push(`${campo} ${comparador} $${length + 1}`)
  }

  if(precio_min) addFilter("precio", ">=", precio_min)
  if(precio_max) addFilter("precio", "<=", precio_max)
  if(categoria) addFilter("categoria", "ILIKE", categoria)
  if(metal) addFilter("metal", "ILIKE", metal)

  let consulta = "SELECT * FROM inventario"
  if(filtros.length){
    filtros = filtros.join(" AND ")
    consulta += ` WHERE ${filtros}`
  }

  const {rows: joyas} = await database.query(consulta, values)
  return joyas
}

const joyasModel = {
  getJoyas,
  filterJoyas
}

module.exports = joyasModel
