const apiEndpoint = 'https://60227067ae8f8700177df77b.mockapi.io/api/'

export async function getThings() {
    const response = await fetch(`${apiEndpoint}things`)
    return response.json()
}
