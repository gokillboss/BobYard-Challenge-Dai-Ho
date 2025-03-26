from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.decorators import action
from django.utils.timezone import now

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('-date')
    serializer_class = CommentSerializer
    # GET /comments/
    def list(self, request):
        comments = Comment.objects.all().order_by('-date')
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    # GET /comments/<id>/
    def retrieve(self, request, pk=None):
        try:
            comment = Comment.objects.get(pk=pk)
            serializer = CommentSerializer(comment)
            return Response(serializer.data)
        except Comment.DoesNotExist:
            return Response({'error': 'Comment not found'}, status=404)

    # POST /comments/
    def create(self, request):
        data = request.data.copy()
        data['author'] = "Admin"
        data['date'] = now()
        data['likes'] = 0
        data['createdAt'] = now()
        data['updatedAt'] = now()
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


    # PUT /comments/<id>/
    def update(self, request, pk=None):
        try:
            comment = Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            return Response({'error': 'Comment not found'}, status=404)

        serializer = CommentSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    # DELETE /comments/<id>/
    def destroy(self, request, pk=None):
        try:
            comment = Comment.objects.get(pk=pk)
            comment.delete()
            return Response({'message': 'Comment deleted successfully'})
        except Comment.DoesNotExist:
            return Response({'error': 'Comment not found'}, status=404)
