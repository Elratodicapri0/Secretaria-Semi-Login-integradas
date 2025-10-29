import re
from django.core.exceptions import ValidationError

def validar_cpf(value):
    
    # Valida se o CPF tem 11 dígitos numéricos diferentes.
    
    cpf = re.sub(r'[^0-9]', '', str(value))
    if len(cpf) != 11 or cpf == cpf[0] * 11:
        raise ValidationError('CPF inválido.')

def validar_telefone(value):
       
    # Valida se o telefone tem 11 dígitos numéricos (formato brasileiro: DDD + número).
    
    telefone = re.sub(r'[^0-9]', '', str(value))
    if len(telefone) != 11:
        raise ValidationError('O telefone deve conter 11 dígitos (incluindo DDD).')