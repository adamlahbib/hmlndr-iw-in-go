package controllers

import (
	"net/http"

	"github.com/adamlahbib/diginvo-back/initializers"
	"github.com/adamlahbib/diginvo-back/models"
	"github.com/gin-gonic/gin"
)

func FetchUserIssuedInvoices(c *gin.Context) {
	var invoices []models.Invoice
	initializers.DB.Where("issuer_id = ?", c.MustGet("user").(models.User).ID).Find(&invoices)
	c.JSON(http.StatusOK, gin.H{
		"invoices": invoices,
	})
}

func FetchUserReceivedInvoices(c *gin.Context) {
	var invoices []models.Invoice
	initializers.DB.Where("recipient_id = ?", c.MustGet("user").(models.User).ID).Find(&invoices)
	c.JSON(http.StatusOK, gin.H{
		"invoices": invoices,
	})
}

func GetInvoiceByID(c *gin.Context) {
	var invoice models.Invoice
	initializers.DB.Where("id = ?", c.Param("id")).First(&invoice)
	c.JSON(http.StatusOK, gin.H{
		"invoice": invoice,
	})
}

func CreateInvoice(c *gin.Context) {
	var body struct {
		RecipientID uint
		Amount      float64
		Description string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return
	}

	var recipient models.User
	initializers.DB.Where("id = ?", body.RecipientID).First(&recipient)

	if recipient.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Recipient not found",
		})

		return
	}

	invoice := models.Invoice{IssuerID: c.MustGet("user").(models.User).ID, RecipientID: recipient.ID, Amount: body.Amount, Description: body.Description}

	result := initializers.DB.Create(&invoice)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create invoice",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Invoice created",
	})
}

func PayInvoice(c *gin.Context) {
	var invoice models.Invoice
	initializers.DB.Where("id = ?", c.Param("id")).First(&invoice)

	if invoice.RecipientID != c.MustGet("user").(models.User).ID {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "You are not the recipient of this invoice",
		})

		return
	}

	if invoice.Paid {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invoice already paid",
		})

		return
	}

	invoice.Paid = true

	result := initializers.DB.Save(&invoice)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to pay invoice",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Invoice paid",
	})
}
