import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

export type ModelFormat = "gltf" | "glb" | "obj" | "stl"

export function getModelFormat(url: string): ModelFormat {
  const extension = url.split(".").pop()?.toLowerCase()
  switch (extension) {
    case "gltf":
    case "glb":
      return "gltf"
    case "obj":
      return "obj"
    case "stl":
      return "stl"
    default:
      throw new Error(`Unsupported model format: ${extension}`)
  }
}

export async function loadModel(url: string) {
  const format = getModelFormat(url)
  
  switch (format) {
    case "gltf": {
      const loader = new GLTFLoader()
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath("/draco/")
      loader.setDRACOLoader(dracoLoader)
      
      const gltf = await loader.loadAsync(url)
      return gltf.scene
    }
    
    case "obj": {
      const loader = new OBJLoader()
      const obj = await loader.loadAsync(url)
      return obj
    }
    
    case "stl": {
      const loader = new STLLoader()
      const geometry = await loader.loadAsync(url)
      return geometry
    }
    
    default:
      throw new Error(`Unsupported model format: ${format}`)
  }
} 