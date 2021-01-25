export function loadImage(src: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image
        image.src = src
        image.onload = () => resolve(image)
        image.onerror = e => reject(e)
    })

}

export async function loadJSON(src: string) {
    const response = await fetch(src)
    return await response.json()
}

export default {
    loadImage,
    loadJSON
}