const API_URL = 'http://localhost:4000'

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`)
  // Load planets and return as JSON.
  return await response.json()
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`)
  return await response.json()
}

async function httpSubmitLaunch(launch) {
  try {
    const response = await fetch(`${API_URL}/launches`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(launch)
    })
    return response
  } catch (err){
    return {
      ok: false
    }
  }
  
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};