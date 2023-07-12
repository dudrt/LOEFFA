from django.shortcuts import render
from django.http.response import HttpResponse

# Create your views here.
http_method_names = ['get', 'post', 'put']
def home(request):
    return HttpResponse("teste")