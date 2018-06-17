const generateMessage = (from, text) => {
  return {from, text, createdAt: Date.now()}
}

const generateLocationMessage = (from, lat, lon) => {
  return {
    from,
    url: `https://google.com/maps?q=${lat},${lon}`,
    createdAt: Date.now()
  };
}

module.exports = {
  generateMessage,
  generateLocationMessage
}