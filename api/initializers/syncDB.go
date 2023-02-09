package initializers

import "github.com/adamlahbib/diginvo-back/models"

func SyncDB() {
	DB.AutoMigrate(&models.User{}, &models.Invoice{})
}
