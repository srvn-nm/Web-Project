from django.db import models

# Create your models here.
class User(models.Model):
    user_id = models.IntegerField() 
    lastname = models.CharField(max_length = 200)
    username = models.CharField(max_length = 200, unique = True)
    firstname = models.CharField(max_length = 200)
    lastname = models.CharField(max_length = 200)
    phone = models.CharField(max_length = 40, unique = True)
    image = models.CharField(max_length = 350, unique = True)
    password = models.CharField(max_length = 100)
    bio = models.CharField(max_length = 200)

    #privacy

    def __str__(self) -> str:
        return self.name

class Contacts(models.Model):
    contact_id =  models.IntegerField() 
    user_id = models.IntegerField() 
    people = models.ManyToManyField(User, related_name='Contacts')