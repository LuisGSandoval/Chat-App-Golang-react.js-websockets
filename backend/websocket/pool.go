package websocket

import (
	"fmt"
)

// Pool is the struct that...
type Pool struct {
	Register    chan *UserClient
	Unregister  chan *UserClient
	UserClients map[*UserClient]bool
	Broadcast   chan Message
}

// NewPool is a function that...
func NewPool() *Pool {
	return &Pool{
		Register:    make(chan *UserClient),
		Unregister:  make(chan *UserClient),
		UserClients: make(map[*UserClient]bool),
		Broadcast:   make(chan Message),
	}
}

// Start is a function that allows start the websockets and also control all the channels from one single place
func (pool *Pool) Start() {
	for {
		select {
		case userClient := <-pool.Register:
			pool.UserClients[userClient] = true
			fmt.Println("Size of connection pool ", len(pool.UserClients))
			for userClient := range pool.UserClients {
				fmt.Println(userClient)
				userClient.Conn.WriteJSON(Message{Type: 2, Body: "New User Joined..."})
			}
			break
		case userClient := <-pool.Unregister:
			delete(pool.UserClients, userClient)
			fmt.Println("Size of connection pool", len(pool.UserClients))
			for userClient := range pool.UserClients {
				userClient.Conn.WriteJSON(Message{Type: 2, Body: "User disconnected..."})
			}
			break
		case message := <-pool.Broadcast:
			fmt.Println("Sending message to all clients in pool")
			for userClient := range pool.UserClients {
				if err := userClient.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}
			}

		}

	}
}
