from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework.decorators import api_view
from loeffa.models import Cadastro
from loeffa.models import Estacoes
from loeffa.models import Pontuacao
from .serializers import EstacoesSerializer
from .serializers import CadastroSerializer
from .serializers import PontuacaoSerializer
from django.views.decorators.csrf import csrf_exempt



from django.http import HttpResponse
import json
http_method_names = ['get', 'POST', 'put']

@api_view(['GET','POST'])
def PegarEstacao(request):
    if request.method == 'GET':
        estacao = Estacoes.objects.all()
        serializer = EstacoesSerializer(estacao,many=True)
        return JsonResponse(serializer.data,safe=False)
    elif request.method == 'POST':
        serializer = EstacoesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(201)
        
@api_view(['GET','POST','DELETE'])
def Cadastros(request):
    if request.method == 'GET':
        estacao = Cadastro.objects.all()
        serializer = CadastroSerializer(estacao,many=True)
        return JsonResponse(serializer.data,safe=False)
    elif request.method == 'POST':
        serializer = CadastroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    
        
@api_view(['GET','POST'])
def PontuacaoAdd(request):
    if request.method== 'GET':
        pontuacao = Pontuacao.objects.all()
        serializer = PontuacaoSerializer(pontuacao,many=True)
        return JsonResponse(serializer.data,safe=False)
    
    elif request.method == 'POST':
        serializer = PontuacaoSerializer(data=request.data)
        if serializer.is_valid():
                serializer.save()
                return Response(201)
        

@api_view(['PUT','GET'])
def PontuacaoMod(request,id):
    try:
        pontuacao = Pontuacao.objects.get(pk=id)
    except:
        return Response("erro")
    
    if request.method=='PUT':
        serializer = PontuacaoSerializer(pontuacao,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response("erro")
    elif request.method=='GET':
        serializer = PontuacaoSerializer(pontuacao)
        return JsonResponse(serializer.data)
    
@api_view(['DELETE'])
def DeletarCadastro(request,id):
    if request.method=='DELETE':
        try:
            deletar = Cadastro.objects.get(pk=id)
            deletar.delete()
            return Response(201)
        except:
            return Response("erro")
    