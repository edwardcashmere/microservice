from django.shortcuts import render,Http404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from .models import Product, User
from .serializers import ProductSerializers
from rest_framework import status
from .producer import publish
import random


# Create your views here.

class ProductViewSet(viewsets.ViewSet):
    
    def list(self, request): # /api/products
        products = Product.objects.all()
        serializer = ProductSerializers(products, many=True)
        return Response(serializer.data)
    
    def create(self, request): # /api/products
        serializer = ProductSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            publish('product_created', serializer.data)
            return Response(serializer.data, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    
    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404
        

    def retrieve(self, request, pk): # /api/products/<str:id>
        product = self.get_object(pk)
        serializer = ProductSerializers(product)
        return Response(serializer.data)
    
    def update(self, request, pk): # /api/products/<str:id>
        product = self.get_object(pk)
        serializer = ProductSerializers(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            publish('product_updated', serializer.data)   
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk, format=None): # /api/products/<str:id>
        product = self.get_object(pk)
        product.delete()
        publish('product_deleted', pk)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class UserAPIView(APIView):
    def get(self,_):
        users = User.objects.all()
        user = random.choice(users)
        return Response({
            'id': user.id
        })
        
    
