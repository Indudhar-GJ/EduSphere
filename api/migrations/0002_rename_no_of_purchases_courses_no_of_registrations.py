# Generated by Django 5.0.4 on 2024-06-24 19:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='courses',
            old_name='no_of_purchases',
            new_name='no_of_registrations',
        ),
    ]
