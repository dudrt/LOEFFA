# Generated by Django 4.2.3 on 2023-07-10 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loeffa', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cadastro',
            name='data',
            field=models.DateField(null=True),
        ),
    ]