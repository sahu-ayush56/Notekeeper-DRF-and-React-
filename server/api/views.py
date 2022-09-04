from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import NoteSerializer
from .models import Note

@api_view(['GET','POST'])
def Notes(request):
    if request.method=='GET':
        notes = Note.objects.all().order_by("-updated")
        serializer = NoteSerializer(notes, many = True)
        return Response(serializer.data)

    if request.method=='POST':
        data = request.data
        note = Note.objects.create(
            body = data['body']
        )
        serializer = NoteSerializer(note,many=False)
        return Response(serializer.data)

@api_view(['GET','PUT','DELETE'])
def Notewithid(request, pk):
    if request.method=='GET':
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(note, many = False)
        return Response(serializer.data)

    if request.method=='PUT':
        data = request.data
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(instance=note, data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
        
    if request.method=='DELETE':
        note = Note.objects.get(id=pk)
        note.delete()
        return Response("Note has been deleted")

