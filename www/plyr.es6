window.onload = () => {
  let p = new URLSearchParams(document.location.search)
  let user = p.get('userid'), videourl = p.get('url'), viewid = (Math.random() * 10000 ^ 0)
  // const h = parse(location.hash)
  let player = document.getElementById('player')
  player.src = videourl
  player.addEventListener("timeupdate", () => {
    // viewid = axios.post('/api/videostat/', JSON.stringify({
    console.log({get: '/api/videostat/',
      id: viewid,
      url: videourl,
      user: user,
      viewed: player.currentTime/player.duration,
      finalised: player.currentTime === player.duration
    })
  })
  // player.addEventListener("onended", () => {
  // })
}
