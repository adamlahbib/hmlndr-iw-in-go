package middleware

import (
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/adamlahbib/diginvo-back/initializers"
	"github.com/adamlahbib/diginvo-back/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func RequireAuth(c *gin.Context) {
	// token string will be in authorization header this time
	tokenString := strings.Split(c.GetHeader("Authorization"), "Bearer ")[1]
	// tokenString, authErr := c.Cookie("Authorization")

	// if authErr != nil {
	// 	c.AbortWithStatus(http.StatusUnauthorized)
	// }

	token, jwtErr := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, nil
		}

		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if jwtErr != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {

		if time.Now().Unix() > int64(claims["exp"].(float64)) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		var user models.User
		initializers.DB.First(&user, claims["uid"])

		if user.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		c.Set("user", user)

		c.Next()

	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}
}
