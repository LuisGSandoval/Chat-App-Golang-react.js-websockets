package websocket

import (
	"fmt"

	"github.com/gorilla/websocket"
)

// UserClient is the struct that..
type UserClient struct {
	ID   string
	Conn *websocket.Conn
	Pool *Pool
}

// Message is the struct that...
type Message struct {
	Type int    `json:"type"`
	Body string `json:"body"`
}

func (c *UserClient) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}

		message := Message{Type: messageType, Body: string(p)}
		c.Pool.Broadcast <- message
		fmt.Printf("Message recieved %+v\n", message)

	}
}
