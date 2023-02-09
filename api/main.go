package main

import (
	"github.com/adamlahbib/diginvo-back/controllers"
	"github.com/adamlahbib/diginvo-back/initializers"
	"github.com/adamlahbib/diginvo-back/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnv()
	initializers.ConnectDB()
	initializers.SyncDB()
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders: []string{"access-control-allow-origin, access-control-allow-headers, authorization, origin, content-type, accept"},
	}))

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	r.GET("/user", middleware.RequireAuth, controllers.GetUser)
	r.GET("/invoices/issued", middleware.RequireAuth, controllers.FetchUserIssuedInvoices)
	r.GET("/invoices/received", middleware.RequireAuth, controllers.FetchUserReceivedInvoices)
	r.GET("/invoices/:id", middleware.RequireAuth, controllers.GetInvoiceByID)
	r.POST("/create-invoice", middleware.RequireAuth, controllers.CreateInvoice)
	r.PUT("/pay-invoice/:id", middleware.RequireAuth, controllers.PayInvoice)

	r.Run()
}
