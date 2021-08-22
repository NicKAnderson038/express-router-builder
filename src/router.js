const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const ROUTES_FOLDER = '/routes'

const buildRoutes = (directoryPath, route) => {
  const rmRoutesFolder = route.replace(ROUTES_FOLDER, '')
  const setRoute = async (rStr) =>
    await router.use(
      `${rmRoutesFolder}/${rStr === 'index' ? '' : rStr}`,
      require(`.${route}/${rStr}`)
    )

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err)
    }

    files.forEach((file) => {
      if (file.endsWith('.js')) {
        setRoute(file.replace('.js', ''))
      } else {
        buildRoutes(
          path.join(__dirname, `${route}/${file}`),
          `${route}/${file}`
        )
      }
    })
  })
}
buildRoutes(path.join(__dirname, ROUTES_FOLDER), ROUTES_FOLDER)

module.exports = router
