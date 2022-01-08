const PROXY_CONFIG = [
    {
        context: [
          "/api",
          "/droneUserApi",
          "/websocket"
        ],
        target: "http://localhost:8080",
        secure: false
    }
]
module.exports = PROXY_CONFIG;