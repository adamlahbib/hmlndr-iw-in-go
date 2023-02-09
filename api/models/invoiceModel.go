package models

import (
	"time"

	"gorm.io/gorm"
)

type Invoice struct {
	gorm.Model
	IssuerID    uint
	Issuer      User `gorm:"foreignKey:IssuerID;"`
	RecipientID uint
	Recipient   User    `gorm:"foreignKey:RecipientID;"`
	Amount      float64 `gorm:"not null;"`
	Date        time.Time
	Paid        bool `gorm:"default:false;"`
	Description string
}
