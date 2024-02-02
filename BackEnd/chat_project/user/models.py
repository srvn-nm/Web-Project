from django.db import models

# Create your models here.
class User(models.Model):

    username = models.CharField(max_length = 200, unique = True)
    firstname = models.CharField(max_length = 200)
    lastname = models.CharField(max_length = 200)
    phone = models.CharField(max_length = 40, unique = True)
    image = models.CharField(max_length = 350, unique = True)
    password = models.CharField(max_length = 200)
    bio = models.CharField(max_length = 100)

    #privacy
    phone_private = models.BooleanField()
    image_private = models.BooleanField()
    bio_private = models.BooleanField()

class UserContacts(models.Model):
    contact_id =  models.CharField(max_length = 200)
    user_id = models.CharField(max_length = 200)
    people = models.CharField(max_length = 200)

class Contacts(models.Model):
    contact_id =  models.IntegerField() 
    user_id = models.IntegerField() 
    people = models.ManyToManyField(User, related_name='Contacts')

class Token(models.Model):
    content = models.CharField(max_length = 300)
    expired_time = models.IntegerField()