export function convertKelvinToFarenheit(tempInKelvin: number) {
    const tempInFarenheit = (tempInKelvin - 273.15) * 9/5 + 32
    return Math.floor(tempInFarenheit);
}