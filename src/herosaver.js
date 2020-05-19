/* global Blob */

import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js'
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter.js'
import { saveAs } from 'file-saver'
import { character, getName, process } from './utils'

// export full scene as JSON (for debugging)
// you can use this to load it later: https://threejs.org/docs/#api/en/loaders/ObjectLoader
window.saveJson = () => saveAs(new Blob([JSON.stringify(window.CK.data.getJson())], { type: 'application/json;charset=utf-8' }), `${getName()}.json`)

// export character as STL file
window.saveStl = subdivisions => {
  const group = process(character, subdivisions, !!character.data.mirroredPose)
  const exporter = new STLExporter()
  saveAs(new Blob([exporter.parse(group)], { type: 'application/sla;charset=utf-8' }), `${getName()}.stl`)
}

// export character as OBJ file
window.saveObj = subdivisions => {
  const group = process(character, subdivisions, !!character.data.mirroredPose)
  const exporter = new OBJExporter()
  saveAs(new Blob([exporter.parse(group)], { type: 'application/octet-stream;charset=utf-8' }), `${getName()}.obj`)
}
