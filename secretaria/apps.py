from django.apps import AppConfig


class secretariaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'secretaria'
    verbose_name = 'Painel Administrativo'
    

# O verbose_name altera o nome que aparece no painel de administração, no lugar de aparecer "Api", será exibido "Painel Administrativo".