from django.db import models

# ---------- Category Model ----------
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


# ---------- Menu Item Model ----------
class MenuItem(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    is_available = models.BooleanField(default=True)
    is_special = models.BooleanField(default=False)

    image = models.ImageField(upload_to='menu_images/', blank=True, null=True)

    def __str__(self):
        return self.name
