from django.db import models
from django.utils.timezone import now

class Comment(models.Model):
    author = models.CharField(max_length=100)
    text = models.TextField()
    date = models.DateTimeField()
    likes = models.IntegerField(default=0)
    image = models.URLField(blank=True)

    createdAt = models.DateTimeField(auto_now_add=True)  
    updatedAt = models.DateTimeField(auto_now=True)     

    class Meta:
        db_table = "comments" 

    def __str__(self):
        return f"{self.author} - {self.text[:30]}"
