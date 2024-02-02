
from django.urls import path

from .views import GroupView , GroupDetailView, DeleteMessageView
                    

urlpatterns = [
    path('api/groups', GroupView.as_view(), name='group'),
    path('api/groups/<int:group_id>', GroupDetailView.as_view(), name='detail_Group'),
    path('api/groups/<int:group_id>', GroupDetailView.as_view(), name='delete_Group'),
    path('api/groups/<int:group_id>/messages/<int:message_id>', DeleteMessageView.as_view(), name='delete_message')
]