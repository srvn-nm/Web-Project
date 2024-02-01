from django.db import models

# Create your models here.
class User(models.Model):
    identifier = models.IntegerChoices()
    lastname = models.CharField(max_length = 200)
    username = models.CharField(max_length = 200, unique = True)
    fullname = models.CharField(max_length = 200)
    lastname = models.CharField(max_length = 200)
    phone = models.CharField(max_length = 40, unique = True)
    image = models.CharField(max_length = 350, unique = True)
    password = models.CharField(max_length = 100)
    bio = models.CharField(max_length = 200)

    def __str__(self) -> str:
        return self.name
