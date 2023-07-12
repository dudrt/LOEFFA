from rest_framework import serializers
from loeffa.models import Estacoes
from loeffa.models import Cadastro
from loeffa.models import Pontuacao

class EstacoesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estacoes
        fields = '__all__'

class CadastroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cadastro
        fields = '__all__'

class PontuacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pontuacao
        fields = '__all__'
