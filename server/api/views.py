from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import NoteSerializer
from .models import Note
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def Notes(request):
    user = request.user
    if request.method=='GET':
        notes = user.note_set.all().order_by("-updated")
        # notes = Note.objects.all().order_by("-updated")
        serializer = NoteSerializer(notes, many = True)
        return Response(serializer.data)

    if request.method=='POST':
        data = request.data
        note = user.note_set.create(
            body = data['body']
        )
        serializer = NoteSerializer(note,many=False)
        return Response(serializer.data)

@api_view(['GET','DELETE','PUT'])
@permission_classes([IsAuthenticated])
def Notewithid(request, id_no):
    user = request.user
    # print(user)
    if request.method=='GET':
        note = user.note_set.get(id=id_no)
        serializer = NoteSerializer(note, many = False)
        return Response(serializer.data)

    if request.method=='PUT':
        data = request.data
        note = user.note_set.get(id=id_no)
        serializer = NoteSerializer(instance=note, data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
        
    if request.method=='DELETE':
        note = user.note_set.get(id=id_no)
        note.delete()
        return Response("Note has been deleted")

@api_view(['POST'])
def Sigup(request):
    cred = request.data
    user = User.objects.create_user(username=cred['username'],password=cred['password'])
    print(user)
    return Response("User Created")
