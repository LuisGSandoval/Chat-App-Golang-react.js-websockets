package main

import (
	"chat/websocket"
	"fmt"
	"net/http"
)

func serveWs(pl *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("Websocket endpoint hit")
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}

	client := &websocket.UserClient{
		Conn: conn,
		Pool: pl,
	}

	pl.Register <- client
	client.Read()

	// go websocket.Writer(conn)
	// websocket.Reader(conn)
	// reader(ws)
}

func setupRoutes() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Web socket server on! 🥳")
	})

	pool := websocket.NewPool()
	go pool.Start()

	// http.HandleFunc("/ws", serveWs)

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})
}

func main() {
	setupRoutes()
	fmt.Println("Distributed Chat App v0.01")
	fmt.Println("Started server")
	http.ListenAndServe("192.168.43.171:8080", nil)

}
